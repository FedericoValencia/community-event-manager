import React, {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import {Community} from './model/Community';
import {Link} from "react-router-dom";

export default function Communities() {

    const [communities, setCommunities] = useState([]);

    async function fetchCommunities() {
        const response = await fetch("http://localhost:3001/api/communities");
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
                            {/* <ListItemText primary="Photos" secondary="Jan 9, 2014" /> */}
                            <Link to={community.uri}>{community.name}</Link>
                        </ListItem>
                    );
                })}
                
            </List>
        </>
    );
}