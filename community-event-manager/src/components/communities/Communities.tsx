import React, {useState} from 'react'
import {Community} from './model/Community';
import {Link} from "react-router-dom";

export default function () {

    const [communities, setCommunities] = useState([]);

    async function fetchCommunities() {
        const response = await fetch("/api/communities");
        setCommunities(await response.json());
    }

    React.useEffect(() => {
        fetchCommunities();
    }, []);

    if (!communities) {
        return <>loading...</>;
    }

    return (
        <>
            <p>Thoughtworks Communities</p>
            {communities.map((community: Community) => {
                return (<Link to={community.uri} key={community.name}>{community.name}</Link>);
            })}
        </>
    );
}