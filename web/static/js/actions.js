import API from "./services/API"

export function fetchSources(){
  return dispatch => {
    dispatch({ type: "REQUEST_SOURCES" })
    API.sources.list().then(sources =>
      dispatch({ type: "RECEIVE_SOURCES", sources })
    )
  }
}

export function fetchSourceData(sourceId){
  return dispatch => {
    dispatch({ type: "REQUEST_SOURCE_DATA", sourceId })
    API.sources.get(sourceId).then(({data}) =>
      dispatch({ type: "RECEIVE_SOURCE_DATA", sourceId, data })
    )
  }
}

export function selectSource(source){
  return (dispatch, getState) => {
    dispatch({ type: "SELECT_SOURCE", source })
    dispatch(fetchSourceData(source.id))
  }
}
