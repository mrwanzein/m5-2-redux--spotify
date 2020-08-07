import React from 'react';
import styled from 'styled-components';

import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {requestArtistInfo, receiveArtistInfo, receiveArtistInfoError} from '../actions';

import {fetchArtistProfile} from '../helpers/api-helpers';

const formatBigNum = (num) => {
    if(num > 1000000) {
        return `${(num/1000000).toFixed(0)}M`
    } else if(num > 1000) {
        return `${(num/1000).toFixed(0)}K`;
    } else {
        return num;
    }
}

const ArtistRoute = () => {
    const dispatch = useDispatch();
    dispatch(requestArtistInfo());

    const artistInfo = useSelector(state => state.artists.currentArtist);
    const accessToken = useSelector(state => state.auth.token);
    const artistId = useParams().artistId;

    React.useEffect(() => {
        
        if(!accessToken) {
            return;
        }
        
        fetchArtistProfile(accessToken, artistId)
        .then(data => dispatch(receiveArtistInfo(data)))
        .catch(err => {
            console.log(err);
            dispatch(receiveArtistInfoError());
        });

    }, [accessToken]);

    console.log(artistInfo)
    return(
        <>
            {
                artistInfo ?  
                    <div>
                        <img src={artistInfo.profile.images[1].url} alt="Corey Henry smiling"/>
                        <p>{artistInfo.profile.name}</p>
                        <p>{formatBigNum(artistInfo.profile.followers.total)} followers</p>
                        <h2>Tags</h2>
                        <p>{artistInfo.profile.genres[0]} {artistInfo.profile.genres[1]}</p>
                    </div> :

                    "Loading..."
            }
        </>
    )
}

export default ArtistRoute;