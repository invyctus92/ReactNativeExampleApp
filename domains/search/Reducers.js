// importo lo stato iniziale che avra questo reducer quando l'app viene chiamata
import DefaultState from './DefaultState';
// definisco i tipi di azioni in un file esterno come costanti
import {
  STAZIONE_PARTENZA,
  STAZIONE_ARRIVO,
  SALVA_STAZIONE_ORIGINE,
  RISULTATI_TRENI,
  SALVA_STATUS,
  NUOVO_PREFERITO,
  LIVE_TRENI,
  ELIMINA_PREFERITO,
  LIVE_TRENI_PREFERITO,
  SALVA_STAZIONE_ORIGINE_PREFERITO,
  STAZIONE_CAMBIO,
  NIENTE_TRENI,
} from './ActionTypes';

// il reducer riceve uno stato che va aggiornando e un azione
// lo stato puo avere un valore iniziale
// l'azione ha le chiavi che sono definite nel crea azioni
// sicuramente il tipo
export function repoReducer(state = DefaultState, action) {
  switch (action.type) {
    case STAZIONE_CAMBIO: {
      // cambio le stazioni
      return {
        ...state,
        stazionePartenza: state.stazioneArrivo,
        stazioneArrivo: state.stazionePartenza,
      };
    }

    case STAZIONE_PARTENZA: {
      return {
        ...state,
        stazionePartenza: action.payload,
      };
    }
    case STAZIONE_ARRIVO: {
      return {
        ...state,
        stazioneArrivo: action.payload,
      };
    }
    // case LIVE_TRENI: {

    //   const liveTreni = state.liveTreni
    //   liveTreni[action.index] = action.payload
    //   return {
    //     ...state,
    //     liveTreni,
    //     statusSearch: ''
    //   };
    // }
    case LIVE_TRENI: {
      if (state.treni.length > action.index) {
        const treni = state.treni;
        console.log(treni);
        treni[action.index].vehicles[action.indexLive].live = action.payload;
        treni[action.index].vehicles[action.indexLive].myfermata =
          action.myfermata;
        console.log(treni);
        return {
          ...state,
          treni,
          statusSearch: '',
        };
      } else {
        return state;
      }
    }
    case LIVE_TRENI_PREFERITO: {
      if (state.treniPreferiti.length > action.index) {
        const treniPreferiti = state.treniPreferiti;
        console.log(treniPreferiti);
        treniPreferiti[action.index].vehicles[action.indexLive].live =
          action.payload;
        treniPreferiti[action.index].vehicles[action.indexLive].myfermata =
          action.myfermata;

        return {
          ...state,
          treniPreferiti,
          statusSearch: '',
        };
      } else {
        return state;
      }
    }
    case NUOVO_PREFERITO: {
      return {
        ...state,
        treniPreferiti: [action.payload, ...state.treniPreferiti],
      };
    }
    case ELIMINA_PREFERITO: {
      let treniNewPreferiti = [...state.treniPreferiti];
      treniNewPreferiti.splice(action.payload, 1);
      return {
        ...state,
        treniPreferiti: treniNewPreferiti,
      };
    }

    case RISULTATI_TRENI: {
      return {
        ...state,
        treni: action.payload.map(elem => {
          return {...elem, stations: action.stations};
        }),
        statusSearch: '',
      };
    }

    case NIENTE_TRENI: {
      return {
        ...state,
        treni: [],
        statusSearch: '',
      };
    }

    case SALVA_STAZIONE_ORIGINE: {
      if (
        state.treni.length > action.id &&
        state.treni[action.id].vehicles.length > action.idVehicles
      ) {
        const treni = state.treni;
        console.log(treni);
        treni[action.id].vehicles[action.idVehicles] = {
          ...treni[action.id].vehicles[action.idVehicles],
          stazioneOrigine: action.payload,
        };
        console.log(treni);
        return {
          ...state,
          treni,
          statusSearch: '',
        };
      } else {
        return state;
      }
    }
    case SALVA_STAZIONE_ORIGINE_PREFERITO: {
      if (
        state.treniPreferiti.length > action.id &&
        state.treniPreferiti[action.id].vehicles.length > action.idVehicles
      ) {
        const treniPreferiti = state.treniPreferiti;
        console.log(treniPreferiti);
        treniPreferiti[action.id].vehicles[action.idVehicles] = {
          ...treniPreferiti[action.id].vehicles[action.idVehicles],
          stazioneOrigine: action.payload,
        };
        console.log(treniPreferiti);
        return {
          ...state,
          treniPreferiti,
          statusSearch: '',
        };
      } else {
        return state;
      }
    }

    case SALVA_STATUS: {
      return {
        ...state,
        statusSearch: action.payload,
      };
    }

    default:
      return state;
  }
}
