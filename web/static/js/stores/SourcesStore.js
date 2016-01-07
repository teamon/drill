import Store from "../utils/Store"
import AppDispatcher from "../AppDispatcher"
import {types, actions} from "../actions"

import API from "../services/API"

class store extends Store {
  constructor(){
    super();

    this.sources = [];
    this.selected = null;
  }

  // public API
  getSelected(){ return this.selected; }
  getSources(){ return this.sources; }

  // should be private
  setSelected(source){
    this.selected = source;
  }

  setSources(sources){ this.sources = sources; }

}

const SourceStore = new store();
export default SourceStore;

AppDispatcher.register(function(payload){
  let action = payload.action;

  switch(action.type){
    case types.RECV_SOURCES_LIST:
      SourceStore.setSources(action.data);
      break;

    case types.RECV_SOURCE_DATA:
      SourceStore.setSelected(action.data);
      break;

    case types.SELECT_SOURCE:
      SourceStore.setSelected(action.data);
      API.sources.get(action.data.id).then(actions.receiveSourceData)
      break;

    case types.LOAD_SOURCES:
      API.sources.list().then(actions.receiveSourcesList)
      break;

    default:
      return true;
  }

  SourceStore.emitChange();

  return true;
})
