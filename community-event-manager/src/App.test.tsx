import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import TestRenderer from 'react-test-renderer';
import Communities from "./components/communities/Communities";

describe('Homepage component', () => {
        it('should render homepage title', () => {
            render(<App/>);

            const linkElement = screen.getByText(/Welcome to community event manager/i);

            expect(linkElement).toBeInTheDocument();
        });

        it("should render list of communities", () => {
            const testRenderer = TestRenderer.create(<App/>);

            const communitiesInstance = testRenderer.root;
            communitiesInstance.findByType(Communities);
        });
    }
);
