import React, {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import {Community} from './model/Community';
import {Link} from "react-router-dom";
import {API_HOST} from '../../configuration/ApiConfiguration'

export default function Communities() {

    const [communities, setCommunities] = useState([]);

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

    return (
        <>
            <p>Thoughtworks Communities</p>
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
        </>
    );
}