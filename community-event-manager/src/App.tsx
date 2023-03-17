import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import CommunityDetails from "./components/community/CommunityDetails";
import Home from "./components/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/communities/data",
        element: <CommunityDetails/>,
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
