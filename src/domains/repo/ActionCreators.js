// per fare richieste asincrone http
import axios from 'axios';

// prendo i tipi di azioni poiche devo mandre un azione quindi mi servono i tipi direttamente senza scivere delle string ma delle costanti
import {ADD_REPO_NAME, ADD_REPO_USER, ADD_STATUS} from './ActionTypes';

export function addRepoUser(payload) {
  return {
    type: ADD_REPO_USER,
    payload,
  };
}

export function addRepoName(payload) {
  return {
    type: ADD_REPO_NAME,
    payload,
  };
}

export function postRepo(callback = () => {}) {
  return async function(dispatch, getState) {
    const {userRepo, nameRepo} = getState().repoState;

    try {
      const response = await axios({
        method: 'post',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`,
        data: {
          repoUrl: 'https://github.com/' + userRepo + '/' + nameRepo,
          sender: 'Angelo',
        },
      });
      console.log(response);

      if (response.status === 200) {
        dispatch({type: ADD_STATUS, payload: response.status});
        callback();
      } else if (response.status) {
        dispatch({type: ADD_STATUS, payload: response.status});
      } else {
        dispatch({type: ADD_STATUS, payload: 'error'});
      }
    } catch (error) {
      dispatch({type: ADD_STATUS, payload: error});
    }
  };
}
