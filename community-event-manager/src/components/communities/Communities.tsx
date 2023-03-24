import React, {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import {Community} from './model/Community';
import {Link} from "react-router-dom";
import {API_HOST} from '../../configuration/ApiConfiguration'
import CreateCommunity from "../create-community/CreateCommunity";

export default function Communities() {

    const [communities, setCommunities] = useState([]);
    const [showCommunityWindow, setShowCommunityWindow] = useState(false);

    async function fetchCommunities() {
        const response = await fetch(`${API_HOST}/api/communities`);
        setCommunities(await response.json());
    }

    React.useEffect(() => {
        fetchCommunities();
    }, []);

    if (!communities) {
        return <>loading...</>;
    }

    function createCommunity() {
        setShowCommunityWindow(true);
    }

    return (
        <>
            <p>Thoughtworks Communities</p>
            <button onClick={createCommunity}>Create community</button>
            <List sx={{ width: '100%', maxWidth: 360}}>
                {communities.map((community: Community) => {
                    return (
                        <ListItem key={community.name}>
                            <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <Link to={community.uri}>{community.name}</Link>
                        </ListItem>
                    );
                })}
                
            </List>

            {showCommunityWindow &&
            <CreateCommunity/>
            }
        </>
    );
}