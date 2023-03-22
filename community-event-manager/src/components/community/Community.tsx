import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {Community as CommunityModel} from "../community/model/Community";

type Params = {
    id: string;
}

export default function Community() {
    const {id} = useParams<Params>();

    const [community, setCommunity] = useState<CommunityModel>();

    async function fetchCommunity(id: string) {
        const response = await fetch(`http://localhost:3001/api/communities/${id}`);
        setCommunity(await response.json());
    }

    React.useEffect(() => {
        fetchCommunity(id!);
    }, [id]);

    if (!community) {
        return <>loading...</>;
    }

    return <>
        <p>{community.name}</p>
    </>
}