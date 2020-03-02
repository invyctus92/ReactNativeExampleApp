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

    // mando la richiesta utilizzando i dati inseriti dall'utente

    try {
      const response = await axios({
        method: 'post',
        url: `https://pushmore.io/webhook/d3Gm4aEPCuhAUjfbECLLdW41`,
        data: {
          repoUrl: 'https://github.com/' + userRepo + '/' + nameRepo,
          sender: 'Angelo',
        },
      });
      console.log(response);

      if (response.status === 200) {
        dispatch({type: ADD_STATUS, payload: response.status});
        if (response.data == 'OK') {
          callback();
        }
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
