import {render, screen} from "@testing-library/react";
import Community from "./Community";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import React from "react";
import {act} from "react-dom/test-utils";

describe('Community in detail component', () => {

    it('should render Community title', async () => {
        const expectedCommunity = {
            name: 'Data Community',
        };
        let mockedCommunitiesAPI = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(expectedCommunity),
            })
        ) as jest.Mock
        let fetchMock = jest.spyOn(global, "fetch").mockImplementation(mockedCommunitiesAPI);

        await act(async () => {
            render(<MemoryRouter initialEntries={["/communities/data"]}>
                <Routes>
                    <Route
                        path="/communities/:id"
                        element={<Community/>}
                    />
                </Routes>
            </MemoryRouter>);
        });

        const title = screen.getByText(/Data Community/i);
        expect(title).toBeInTheDocument();
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/api/communities/data');
        fetchMock.mockRestore();
    });

});
