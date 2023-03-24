import {unmountComponentAtNode} from 'react-dom';
import {render, screen, waitFor} from '@testing-library/react';
import Communities from "./Communities";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";


jest.mock("../create-community/CreateCommunity", () => () => {
    return <div data-testid="createCommunity"/>;
});

describe('Communities component', () => {

        let container: any = null;
        beforeEach(() => {
            // setup a DOM element as a render target
            container = document.createElement("div");
            document.body.appendChild(container);
        });

        afterEach(() => {
            // cleanup on exiting
            unmountComponentAtNode(container);
            container.remove();
            container = null;
        });

        async function expectCommunitiesToBeRender(expectedCommunities: ({ name: string; uri: string } | { name: string; uri: string })[]) {
            for (const community of expectedCommunities) {
                const communityElement: HTMLElement = await waitFor(() => {
                    return screen.getByText(community.name);
                });
                expect(communityElement).toBeInTheDocument();
                const expectedLinkURI = communityElement.getAttribute('href');
                expect(expectedLinkURI).toBe(community.uri);
            }
        }

        it('should render Communities title', () => {
            render(<Communities/>);

            const title = screen.getByText(/Thoughtworks Communities/i);

            expect(title).toBeInTheDocument();
        });

        it("should render list of communities", async () => {
            const expectedCommunities = [
                {
                    name: 'Data',
                    uri: '/communities/data'
                },
                {
                    name: 'DEISCC',
                    uri: '/communities/deiscc'
                }
            ]
            const mockedCommunitiesAPI = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(expectedCommunities),
                })
            ) as jest.Mock
            const fetchMock = jest.spyOn(global, "fetch").mockImplementation(mockedCommunitiesAPI);

            render(<MemoryRouter><Communities/></MemoryRouter>, container);

            await expectCommunitiesToBeRender(expectedCommunities);
            expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/api/communities');
            fetchMock.mockRestore();
        });

        it("should render create community window", async () => {
            userEvent.setup()
            render(<Communities/>);
            const createCommunityButton = screen.getByText(/Create community/i);

            act(() => {
                userEvent.click(createCommunityButton)
            });

            const communityWindow = await waitFor(() => {
                return screen.getByTestId("createCommunity");
            });
            expect(communityWindow).toBeInTheDocument();
        });
    }
);
