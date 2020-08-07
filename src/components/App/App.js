import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import GlobalStyles from '../GlobalStyles';
import ArtistRoute from '../ArtistRoute';

const DEFAULT_ARTIST_ID = '21SOnTj5ECwVXeBUTRcP3s';

const App = () => {
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
