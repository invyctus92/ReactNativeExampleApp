const state = {
  // stazione d'origine
  stazioneOrigine: { name: "", id: "" },
  // dove prendo il treno
  stazionePartenza: { name: "", id: "" },
  stazioneArrivo: { name: "", id: "" },
  treni: [],
  statusSearch: "",
  treniPreferiti: [],
  // ogni giorno aggiorno gli id a seconda che i treni preferiti siano nel giorno interessato
  updateIdTreniPreferiti: "",
  idTreniPreferiti: [],
  liveTreni: []
};

export default state;
