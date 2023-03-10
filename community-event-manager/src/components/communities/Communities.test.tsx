import React from 'react';
import { createRoot } from 'react-dom/client';
import { render, screen } from '@testing-library/react';
import Communities from "./Communities";
import { act } from "react-dom/test-utils";

describe('Communities component', () => {
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
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(expectedCommunities),
                }),
            ) as jest.Mock;

            let container = document.createElement("div");
            document.body.appendChild(container);
            let root = createRoot(container!);
            await act(async () => {
                root.render(<Communities />);
            });
            expectedCommunities.forEach((community : any) => {
                expect(container.textContent).toContain(community.name);
            });
            
        });
    }
);
