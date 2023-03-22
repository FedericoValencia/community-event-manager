import {unmountComponentAtNode} from 'react-dom';
import {render, screen} from '@testing-library/react';
import Communities from "./Communities";
import {act} from "react-dom/test-utils";
import {Community} from './model/Community';
import {MemoryRouter} from "react-router-dom";

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

            let mockedCommunitiesAPI = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(expectedCommunities),
                })
            ) as jest.Mock

            let fetchMock = jest.spyOn(global, "fetch").mockImplementation(mockedCommunitiesAPI);

            await act(async () => {
                render(<MemoryRouter><Communities/></MemoryRouter>, container);
            });

            expectedCommunities.forEach((community: Community) => {
                const communityElement = screen.getByText(community.name);
                const expectedLinkURI = communityElement.getAttribute('href');
                expect(communityElement).toBeInTheDocument();
                expect(expectedLinkURI).toBe(community.uri);
            });
            expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/api/communities');
            fetchMock.mockRestore();
        });
    }
);
