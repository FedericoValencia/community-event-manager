import App from "../../App";
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import {render} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

jest.mock("./CommunityDetails", () => () => {
    return <div data-testid="communityDetails" />;
});

describe('Community component integration test', () => {


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


    it("should navigate to community detail page", async () => {

        const expectedCommunities = [
            {
                name : 'Data',
                uri: '/communities/data'
            }
        ];

        let mockedCommunitiesAPI = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(expectedCommunities),
            })
        ) as jest.Mock
        
        let fetchMock = jest.spyOn(global, "fetch").mockImplementation(mockedCommunitiesAPI);

        await act(async () => {
            render(<App/>, container);
        });

        let dataCommunityLink = document.querySelector('[href="/communities/data"]');
        expect(dataCommunityLink).toBeInTheDocument();
        ReactTestUtils.Simulate.click(dataCommunityLink!);
        expect(document.querySelector("[data-testid='communityDetails']")).toBeInTheDocument();
        fetchMock.mockRestore();
    })
});