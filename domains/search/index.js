// esporto il reducers e funzioni per creare azioni
// ovvero rendo risponibile solo cio che mi interessa
// potrei avere piu crea azioni che in realto uso internamente, tipo quando creo un azione che è una richiesta asincrona
//che poi manda un altra azione chimando l'altro crea azione mandando i dati ricevuti dalla richiesta asincrona
export { searchReducer } from "./Reducers";
export {
  salvaStazionePartenza,
  salvaStazioneDestinazione,
  salvaRisultatiTreni,
  aggiornaStatus,
  infoTreno
} from "./ActionCreators";
