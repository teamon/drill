import keyMirror from "fbjs/lib/keyMirror"
import AppDispatcher from "./AppDispatcher"

export const types = keyMirror({
  // queries results
  RECV_SOURCES_LIST: null,
  RECV_SOURCE_DATA: null,

  // commands
  LOAD_SOURCES: null,
  SELECT_SOURCE: null,
});

export const actions = {
  loadSources: function(){
    AppDispatcher.handleAction({
      type: types.LOAD_SOURCES
    })
  },

  receiveSourcesList: function(data){
    AppDispatcher.handleAction({
      type: types.RECV_SOURCES_LIST,
      data: data
    })
  },

  receiveSourceData: function(data){
    AppDispatcher.handleAction({
      type: types.RECV_SOURCE_DATA,
      data: data
    })
  },

  selectSource: function(source){
    AppDispatcher.handleAction({
      type: types.SELECT_SOURCE,
      data: source
    })
  }
}
