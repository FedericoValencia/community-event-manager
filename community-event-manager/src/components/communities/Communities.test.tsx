import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import Communities from "./Communities";
import { act } from "react-dom/test-utils";

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

        it("it should render list of communities", async () => {
            const expectedCommunities = [
                {
                    name : 'Data'
                },
                {
                    name : 'DEISCC'
                }
            ]

            let mockedCommunitiesAPI = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(expectedCommunities),
                })
            ) as jest.Mock
            
            let fetchMock = jest.spyOn(global, "fetch").mockImplementation(mockedCommunitiesAPI);

            await act(async () => {
                render(<Communities/>, container);
            });
            
            expectedCommunities.forEach((community : any) => {
                const communityElement = screen.getByText(community.name);
                expect(communityElement).toBeInTheDocument();
            });
            expect(fetchMock).toHaveBeenCalledWith('/api/communities');
            fetchMock.mockRestore();
        });
    }
);
