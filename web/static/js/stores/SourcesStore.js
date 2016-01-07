import Store from "../utils/Store"
import AppDispatcher from "../AppDispatcher"
import {types, actions} from "../actions"

import API from "../services/API"

const state = {
  sources: [],
  selected: null,

  setSelected: function(source){ this.selected = source; },
  setSources: function(sources){ this.sources = sources; }
};

export default new class SourceStore extends Store {
  getSelected(){ return state.selected; }
  getSources(){ return state.sources; }

  handleAction(payload){
    let action = payload.action;

    switch(action.type){
      case types.RECV_SOURCES_LIST:
        state.setSources(action.data);
        break;

      case types.RECV_SOURCE_DATA:
        state.setSelected(action.data);
        break;

      case types.SELECT_SOURCE:
        let source = action.data;

        state.setSelected(source);

        API.sources.get(action.data.id).then(s => {
          source.data = s.data
          actions.receiveSourceData(source)
        })
        break;

      case types.LOAD_SOURCES:
        API.sources.list().then(actions.receiveSourcesList)
        break;
    }
  }
}
