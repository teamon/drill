import React from "react";

export default class FluxComponent extends React.Component {
  constructor(props){
    super(props);
  }

  flux(stores, getState){
    this.fluxStores = stores;
    this.fluxGetState = getState;
    this.state = this.fluxGetState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.fluxGetState(nextProps));
  }

  componentDidMount(){
    this.fluxStores.forEach(store => store.addChangeListener(this.handleStoresChanged));
  }

  componentWillUnmount(){
    this.fluxStores.forEach(store => store.removeChangeListener(this.handleStoresChanged));
  }

  handleStoresChanged = () => {
    this.setState(this.fluxGetState(this.props));
  }
}
