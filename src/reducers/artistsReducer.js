const initialState = {
    currentArtist: null,
    status: 'idle',
  };
  
  export default function artistReducer(state = initialState, action) {
    switch (action.type) {
      case 'REQUEST_ARTIST_INFO': {
        return {
          ...state,
          status: 'loading',
          };
      }
      
      case 'RECEIVE_ARTIST_INFO': {
        return {
          ...state,
          status: 'idle',
          currentArtist: {
            profile: action.artistInfo
          }
        };
      }

      case 'RECEIVE_ARTIST_INFO_ERROR': {
        return {
          ...state,
          status: 'error',
          };
      }

      default: {
        return state;
      }
    }
  }