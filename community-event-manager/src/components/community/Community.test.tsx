import {render, screen} from "@testing-library/react";
import Community from "./Community";
import React from "react";
import {act} from "react-dom/test-utils";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 'data',
    }),
    useRouteMatch: () => ({url: '/communities/data'}),
}));

describe('Community in detail component', () => {

    it('should render title and  the Community events', async () => {
        const expectedCommunity = {
            name: 'Data Community',
            events: ['Event 1', 'Event 2']
        };
        const mockedCommunitiesAPI = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(expectedCommunity),
            })
        ) as jest.Mock
        jest.spyOn(global, "fetch").mockImplementation(mockedCommunitiesAPI);

        await act(async () => {
            render(<Community/>);
        });

        const title = screen.getByText("Data Community");
        expect(title).toBeInTheDocument()
        const [event1, event2] = screen.getAllByRole('listitem');
        expect(event1).toHaveTextContent("Event 1")
        expect(event2).toHaveTextContent("Event 2")
    });

});
