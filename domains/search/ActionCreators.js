// per fare richieste asincrone http
import axios from 'axios';

import spacetime from 'spacetime';
// prendo i tipi di azioni poiche devo mandre un azione quindi mi servono i tipi direttamente senza scivere delle string ma delle costanti
import {
  STAZIONE_PARTENZA,
  STAZIONE_ARRIVO,
  SALVA_STAZIONE_ORIGINE,
  RISULTATI_TRENI,
  SALVA_STATUS,
  NUOVO_PREFERITO,
  LIVE_TRENI,
  ELIMINA_PREFERITO,
  SALVA_STAZIONE_ORIGINE_PREFERITO,
  LIVE_TRENI_PREFERITO,
  STAZIONE_CAMBIO,
  NIENTE_TRENI,
} from './ActionTypes';

export function salvaStazionePartenza(payload) {
  return {
    type: STAZIONE_PARTENZA,
    payload,
  };
}

export function salvaStazioneDestinazione(payload) {
  return {
    type: STAZIONE_ARRIVO,
    payload,
  };
}

export function cambiaStazioni() {
  return {
    type: STAZIONE_CAMBIO,
  };
}

export function aggiungiNuovoPreferito(payload) {
  return {
    type: NUOVO_PREFERITO,
    payload,
  };
}

export function togliIndexPreferito(index) {
  return {
    type: ELIMINA_PREFERITO,
    payload: index,
  };
}

export function aggiornaStatus(payload) {
  return {
    type: SALVA_STATUS,
    payload,
  };
}

export function salvaRisultatiTreni2(payload) {
  return {
    type: RISULTATI_TRENI,
    payload,
  };
}

export function aggiornaPreferiti() {
  return async function(dispatch, getState) {
    let {treniPreferiti} = getState().search;

    // se c'e almeno un treno preferito

    if (treniPreferiti.length) {
      dispatch({
        type: SALVA_STATUS,

        payload: 'aggiornamento preferiti',
      });

      // prendo le citta di riferimento
      const now = new spacetime.now();

      treniPreferiti.map((preferito, index) => {
        preferito.vehicles.map((treno, idVehicles) => {
          // vedo l'orario di partenza della mia stazione ma da dove parte
          const orarioPartenza = new spacetime(treno.orarioPartenza);
          const orarioFine = new spacetime(treno.orarioArrivo);

          if (treno.live) {
            // ho l'orario di partenza controllo se devo aggiornare
            let orarioPartenzaStazioneOrigine = new spacetime(
              treno.live.orarioPartenzaZero,
            );
            // controllo l'orario e il giorno
            console.log(orarioPartenzaStazioneOrigine);
            console.log(now.hour());
            console.log(orarioPartenzaStazioneOrigine.hour());
            // se stesso giorno controllo l'ora

            // if (now.getspacetime.now == orarioPartenza.getspacetime.now) {
            if (
              now.hour() >= orarioPartenzaStazioneOrigine.hour() &&
              now.hour() <=
                (orarioFine.hour() > 21 ? 24 : orarioFine.hour() + 2)
            ) {
              // devo controllare

              // se ho la stazione d'origine aggiorno le info live
              if (treno.stazioneOrigine) {
                console.log('1');
                console.log(preferito);
                console.log(treno);
                console.log(preferito.stations);
                dispatch(
                  infoTreno(
                    treno.stazioneOrigine.id,
                    treno.numeroTreno,
                    preferito.stations,
                    index,
                    idVehicles,
                    (callback = null),
                    (preferito = true),
                  ),
                );
              } else {
                console.log('2');
                dispatch(
                  cercoStazioneOrigine(
                    treno.numeroTreno,
                    preferito.stations,
                    index,
                    idVehicles,
                    (preferito = true),
                  ),
                );
              }
            }
          } else {
            // prendo le info del treno comunque
            if (treno.stazioneOrigine) {
              console.log('3');
              dispatch(
                infoTreno(
                  treno.stazioneOrigine.id,
                  treno.numeroTreno,
                  preferito.stations,
                  index,
                  idVehicles,
                  (callback = null),
                  (preferito = true),
                ),
              );
            } else {
              console.log('4');
              dispatch(
                cercoStazioneOrigine(
                  treno.numeroTreno,
                  preferito.stations,
                  index,
                  idVehicles,
                  (preferito = true),
                ),
              );
            }
          }

          //  }
        });
      });
    }
  };
}

// https://www.lefrecce.it/msite/api/solutions?origin=PALERMO%20CENTRALE&destination=S. FLAVIA-SOLUNTO-PORTICELLO&arflag=A&adate=24/07/2019&atime=17&adultno=1&childno=0&direction=A&frecce=false&onlyRegional=false

export function salvaRisultatiTreni() {
  return async function(dispatch, getState) {
    dispatch({
      type: SALVA_STATUS,

      payload: 'caricamento',
    });

    dispatch({
      type: NIENTE_TRENI,
    });

    let {stazionePartenza, stazioneArrivo} = getState().search;

    // origin = 'PALERMO%20CENTRALE',
    // destination = 'S.%20FLAVIA-SOLUNTO-PORTICELLO',
    origin = stazionePartenza.id.replace(/S0*/g, '');

    destination = stazioneArrivo.id.replace(/S0*/g, '');

    // 2019-08-30T7:00:00

    const now = new spacetime.now();
    // adate = "26/08/2019",
    // now.hour() - 1 cerco anche un ora indietro, magari qualche treno precedente è in ritardo
    const atime =
      now.year() +
      '-' +
      (now.month() + 1) +
      '-' +
      now.date() +
      'T' +
      (now.hour() - 1) +
      ':00:00.000Z';
    //  atime = "20";

    console.log(atime);

    // 2019-07-30T7:48:45.214Z
    const linkRequest = `https://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/soluzioniViaggioNew/${origin}/${destination}/${atime}`;
    console.log(linkRequest);

    axios
      .get(linkRequest)
      .then(res => {
        console.log(res);

        if (res.status == 200) {
          const stations = {
            origin,
            destination,
          };
          dispatch({
            type: RISULTATI_TRENI,
            payload: res.data.soluzioni,
            stations,
          });
          res.data.soluzioni.map((treni, index) => {
            // vedo parte il treno, cerco soltanto i treni con 2-3 ore successive
            // oppure soltanto i primi risultati
            if (index < 4) {
              treni.vehicles.map((treno, idVehicles) => {
                dispatch(
                  cercoStazioneOrigine(
                    treno.numeroTreno,
                    stations,
                    index,
                    idVehicles,
                  ),
                );
              });
            }
          });
        } else {
          dispatch({
            type: SALVA_STATUS,

            payload: 'errore',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

// cerco l'origine di partenza di un treno
// http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/cercaNumeroTrenoTrenoAutocomplete/26493
// preferito per sapere dove salvare i dati
export function cercoStazioneOrigine(
  numeroTreno,
  stations,
  id = 0,
  idVehicles = 0,
  preferito = false,
) {
  return async function(dispatch, getState) {
    dispatch({
      type: SALVA_STATUS,

      payload: 'caricamento stazione origine',
    });

    axios
      .get(
        `http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/cercaNumeroTrenoTrenoAutocomplete/${numeroTreno}`,
      )
      .then(res => {
        console.log(res);

        if (res.status == 200) {
          // 12721 - S. AGATA DI MILITELLO|12721-S12027
          // se si sa già da dove parte

          // altrimenti ritorno data vuoto

          const stringa = res.data;
          if (stringa.length) {
            const split = stringa.split(' - ');

            const split2 = split[1].split('|');
            const name = split2[0];
            const split3 = split2[1].split('-');
            const idName = split3[1].replace('\n', '');

            console.log(idName);
            dispatch({
              type: preferito
                ? SALVA_STAZIONE_ORIGINE_PREFERITO
                : SALVA_STAZIONE_ORIGINE,
              id,
              idVehicles,
              payload: {name, id: idName},
            });
            // ho tutto l'occorrente per chiedere i dati sul live
            dispatch(
              infoTreno(
                idName,
                numeroTreno,
                stations,
                id,
                idVehicles,
                (callback = null),
                preferito,
              ),
            );
          }
        } else {
          dispatch({
            type: SALVA_STATUS,

            payload: 'errore stazione origine',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

// http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/andamentoTreno/S12019/7971

// index per sapere l'indice della ricerca nell'array
// indexLive, indice della tratta della singola ricerca, se ci sono due treni o piu per arrivare da una parte
export function infoTreno(
  IDStazionePartenza,
  numeroTreno,
  stations,
  index,
  indexLive,
  callback = null,
  preferito = false,
) {
  return async function(dispatch, getState) {
    dispatch({
      type: SALVA_STATUS,

      payload: 'caricamento live',
    });

    console.log(IDStazionePartenza);
    console.log(numeroTreno);
    // idTreno = 4ef147e0a93078c49a76a50d271dc116i0
    // https://www.lefrecce.it/msite/api/solutions/4ef147e0a93078c49a76a50d271dc116i0/details
    axios
      .get(
        `http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/andamentoTreno/${IDStazionePartenza}/${numeroTreno}`,
      )
      .then(res => {
        console.log(res);

        if (res.status == 200) {
          // vedo se devo caricare le info in una pagina
          // o se è utile per il live dei preferiti
          if (callback) {
            callback(res.data, index, indexLive);
            dispatch({
              type: SALVA_STATUS,

              payload: '',
            });
          } else {
            // stations
            // calcolo la mia fermata
            let myfermata = {};
            const fermate = res.data.fermate;
            for (
              indexFermate = 0;
              indexFermate < fermate.length;
              indexFermate++
            ) {
              if (fermate[indexFermate].id == 'S' + stations.origin) {
                myfermata = fermate[indexFermate];
                break;
              } else {
                continue;
              }
            }

            dispatch({
              type: preferito ? LIVE_TRENI_PREFERITO : LIVE_TRENI,
              payload: res.data,
              index,
              indexLive,
              myfermata,
            });
          }
        } else {
          dispatch({
            type: SALVA_STATUS,

            payload: 'errore live',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

// export function getCoins() {
//   // ritorno una chiamata a una funzione che quando termina chiama un crea azioni standard
//   return async dispatch => {
//     const risultato = await wikisearch();
//     const valore = elabora(risultato, dispatch);

//   };
// }

// async function wikisearch() {
//   let prova = await wiki({
//     apiUrl: "https://it.wikipedia.org/w/api.php"
//   }).page("Episodi_di_Mr._Robot_(prima_stagione)");
//   console.log(prova);

//   let result = await prova.html();
//   console.log(result);
//   const result1 = await result.indexOf("<table");
//   const result2 = await result.indexOf("</table>");
//   const risultato = result.slice(result1, result2 + 8);
//   console.log(risultato);

//   return risultato;
// }
