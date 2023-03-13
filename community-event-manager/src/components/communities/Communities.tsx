import React from 'react'
import { useState } from 'react'
import { Community } from './Community';

export default function (){

    const [communities, setCommunities] = useState([]);

    async function fetchCommunities() {
        const response = await fetch("/api/communities");
        setCommunities(await response.json());
    }

    React.useEffect(()=>{
        fetchCommunities();
    }, []);

    if (!communities) {
        return <>loading...</>;
    }

    return (
        <>
            <p>Thoughtworks Communities</p>
            { communities.map( (community: Community) => {
                return (<p key={community.name}>{community.name}</p>);
            })}          
        </>
    );
}