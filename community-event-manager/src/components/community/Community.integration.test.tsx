import App from "../../App";
import {act} from 'react-dom/test-utils';
import {render} from '@testing-library/react';
import {unmountComponentAtNode} from 'react-dom';

jest.mock("./Community", () => () => {
    return <div data-testid="communityDetails"/>;
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
                name: 'Data',
                uri: '/communities/data'
            }
        ];
        const mockedCommunitiesAPI = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(expectedCommunities),
            })
        ) as jest.Mock
        const fetchMock = jest.spyOn(global, "fetch").mockImplementation(mockedCommunitiesAPI);
        await act(async () => {
            render(<App/>, container);
        });
        const dataCommunityLink = document.querySelector('[href="/communities/data"]');
        expect(dataCommunityLink).toBeInTheDocument();

        await act(async () => {
            dataCommunityLink!.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(document.querySelector("[data-testid='communityDetails']")).toBeInTheDocument();
        fetchMock.mockRestore();
    })
});