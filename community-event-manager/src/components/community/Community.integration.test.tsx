import React from "react";
import App from "../../App";
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import {render} from '@testing-library/react';

import CommunityDetails from "./CommunityDetails";
import ReactDOM from "react-dom/client";

describe('Community component integration test', () => {



    it("should navigate to community detail page", () => {

        const domContainer = document.createElement('div');

        let root1 = ReactDOM.createRoot(domContainer);
        ReactTestUtils.renderIntoDocument(<App/>);
        let root = document.createElement(“div”);
        document.body.appendChild(root);
        ReactTestUtils.findAllInRenderedTree(App,()=>true);
        dataCommunityLink = document.querySelector('[href="/community/data"]');
        ReactTestUtils.Simulate.click(dataCommunityLink!);

        ReactTestUtils.findRenderedComponentWithType(root1, CommunityDetails)

        ReactTestUtils.isElementOfType(
            dataCommunityLink,
            CommunityDetails
        )
    })
});