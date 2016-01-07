import Store from "../utils/Store"
import AppDispatcher from "../AppDispatcher"
import {types, actions} from "../actions"

import API from "../services/API"

const state = {
  sources: [],
  selected: null,
  selectedData: [],

  setSelected: function(source){ this.selected = source; },
  setSelectedData: function(data){ this.selectedData = data; },
  setSources: function(sources){ this.sources = sources; }
};

export default new class SourceStore extends Store {
  getSelected(){ return state.selected; }
  getSelectedData(){ return state.selectedData; }
  getSources(){ return state.sources; }

  handleAction(payload){
    let action = payload.action;

    switch(action.type){
      case types.RECV_SOURCES_LIST:
        state.setSources(action.data);
        break;

      case types.RECV_SOURCE_DATA:
        state.setSelectedData(action.data);
        break;

      case types.SELECT_SOURCE:
        state.setSelected(action.data);
        state.setSelectedData(null);

        API.sources.get(action.data.id).then(({data}) => {
          actions.receiveSourceData(data);
        })
        break;

      case types.LOAD_SOURCES:
        API.sources.list().then(actions.receiveSourcesList)
        break;
    }
  }
}
