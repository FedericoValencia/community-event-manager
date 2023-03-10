import React from 'react'
import { useState } from 'react'

export default function (){

    const [communities, setCommunities] = useState([]);

    async function fetchCommunities() {
        const response = await fetch("/");
        setCommunities(await response.json());
    }

    if (!communities) {
        return "loading...";
    }

    return (
        <React.Fragment>
            <div>

            <p>Thoughtworks Communities</p>

            { communities.map( (community: any) => {
                <p>`${community.name}`</p>
            })}
            </div>
        </React.Fragment>
    );
}