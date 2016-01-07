import EventEmitter from "events"
import AppDispatcher from "../AppDispatcher"

export default class Store extends EventEmitter {
  constructor(){
    super();

    AppDispatcher.register(payload => {
      this.handleAction(payload);
      this.emitChange();
    })
  }
  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
}
