import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {Community} from "../community/model/Community";

type Params = {
    id: string;
}

export default function () {
    const {id} = useParams<Params>();

    const [community, setCommunity] = useState<Community>();

    async function fetchCommunity(id: string) {
        const response = await fetch(`/api/communities/${id}`);
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