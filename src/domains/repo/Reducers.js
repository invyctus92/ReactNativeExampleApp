// importo lo stato iniziale che avra questo reducer quando l'app viene chiamata
import DefaultState from './DefaultState';
// definisco i tipi di azioni in un file esterno come costanti
import {ADD_REPO_NAME, ADD_REPO_USER, ADD_STATUS} from './ActionTypes';

// il reducer riceve uno stato che va aggiornando e un azione
// lo stato puo avere un valore iniziale
// l'azione ha le chiavi che sono definite nel crea azioni
// sicuramente il tipo
export function repoReducer(state = DefaultState, action) {
  switch (action.type) {
    case ADD_REPO_NAME:
      {
        return {
          ...state,
          nameRepo: action.payload,
        };
      }
      break;
    case ADD_REPO_USER:
      {
        return {
          ...state,
          userRepo: action.payload,
        };
      }
      break;
    case ADD_STATUS:
      {
        return {
          ...state,
          statusRequest: action.payload,
        };
      }
      break;
    default:
      return state;
  }
}
