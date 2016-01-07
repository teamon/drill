import API from "./services/API"

function requestSources(){
  return { type: "REQUEST_SOURCES" };
}

function receiveSources(sources){
  return { type: "RECEIVE_SOURCES", sources };
}

export function fetchSources(){
  return dispatch => {
    dispatch(requestSources())
    API.sources.list().then(sources =>
      dispatch(receiveSources(sources))
    )
  }
}

function requestSourceData(sourceId){
  return { type: "REQUEST_SOURCE_DATA", sourceId };
}

function receiveSourceData(sourceId, data){
  return { type: "RECEIVE_SOURCE_DATA", sourceId, data };
}

export function fetchSourceData(sourceId){
  return dispatch => {
    dispatch(requestSourceData(sourceId))
    API.sources.get(sourceId).then(({data}) =>
      dispatch(receiveSourceData(sourceId, data))
    )
  }
}

export function selectSource(source){
  return dispatch => {
    dispatch({ type: "SELECT_SOURCE", source })
    dispatch(fetchSourceData(source.id))
  }
}
