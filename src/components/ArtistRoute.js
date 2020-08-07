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
                    <Wrapper>
                        <ProfileImage src={artistInfo.profile.images[1].url} alt="Corey Henry smiling" />
                        <LiftUp>
                            <Name>{artistInfo.profile.name}</Name>
                            <p style={{position: "relative", top: "-20px"}}><span style={{color: "rgb(247, 109, 238)", fontWeight: "bold"}}>{formatBigNum(artistInfo.profile.followers.total)}</span> followers</p>
                            <Center>
                                <h2>tags</h2>
                                <p><Tags>{artistInfo.profile.genres[0]}</Tags> <Tags>{artistInfo.profile.genres[1]}</Tags></p>
                            </Center>
                        </LiftUp>
                    </Wrapper> :

                    "Loading..."
            }
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 50%;
    height: 50%;
    margin-top: 60px;
`;

const Name = styled.p`
    font-size: 2.2em;
    font-weight: bold;
`;

const LiftUp = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -60px;
`;

const Tags = styled.span`
    background-color: rgb(64, 64, 64);
    color: white;
    border-radius: 10px;
    padding: 10px;
    margin: 0 5px;
`;
const Center = styled.div`
    position: relative;
    top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default ArtistRoute;