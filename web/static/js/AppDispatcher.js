import {Dispatcher} from "flux";

const AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action){
  console.warn("dispatch", action.type, action)
  this.dispatch({
    source: "VIEW_ACTION",
    action: action
  })
}

export default AppDispatcher;
