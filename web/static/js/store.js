import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import { fetchSourceData } from "./actions"

const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

const store = createStoreWithMiddleware(function(state = {}, action){
  const merge = data => Object.assign({}, state, data)

  switch(action.type){
    case 'REQUEST_SOURCES':
      return state

    case 'RECEIVE_SOURCES':
      return {sources: action.sources}

    case 'REQUEST_SOURCE_DATA':
      return state

    case 'RECEIVE_SOURCE_DATA':
      return merge({selectedSourceData: action.data})

    case 'SELECT_SOURCE':
      return merge({selectedSource: action.source, selectedSourceData: null})

    default:
      return state;
  }
});

export default store;
