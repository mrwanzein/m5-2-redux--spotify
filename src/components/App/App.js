import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {requestAccessToken, receiveAccessToken, receiveAccessTokenError} from '../../actions';

import GlobalStyles from '../GlobalStyles';
import ArtistRoute from '../ArtistRoute';

const DEFAULT_ARTIST_ID = '21SOnTj5ECwVXeBUTRcP3s';

const App = () => {
  const dispatch = useDispatch();
  
  dispatch(requestAccessToken());

  React.useEffect(() => {
    fetch("/spotify_access_token")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      dispatch(receiveAccessToken(json.access_token));
    })
    .catch((err) => {
      console.error(err);
      dispatch(receiveAccessTokenError());
    });
  }, []);
  
  return(
    <>
      <GlobalStyles />
      <Router>
        <Switch>
            <Route path="/artist/:artistId">
              <ArtistRoute />
            </Route>
            <Redirect to={`/artist/${DEFAULT_ARTIST_ID}`} />
        </Switch>
      </Router>
    </>
  )
};

export default App;
