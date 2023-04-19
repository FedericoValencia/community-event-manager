import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {Community as CommunityModel} from "../community/model/Community";
import {API_HOST} from '../../configuration/ApiConfiguration'

type Params = {
    id: string;
}

export default function Community() {
    const {id} = useParams<Params>();

    const [community, setCommunity] = useState<CommunityModel>();

    async function fetchCommunity(id: string) {
        const response = await fetch(`${API_HOST}/api/communities/${id}`);
        setCommunity(await response.json());
    }

    React.useEffect(() => {
        if(id) {
            fetchCommunity(id);
        }
    }, [id]);

    if (!community) {
        return <>loading...</>;
    }

    return <>
        <p>{community.name}</p>
        <p>{community.event}</p>
    </>
}