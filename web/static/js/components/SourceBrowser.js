import React from "react";
import FluxComponent from "../utils/FluxComponent"
import SourcesStore from "../stores/SourcesStore"

import Table from "./Table"

export default class SourceBrowser extends FluxComponent {
  constructor(props){
    super(props);
    this.flux([SourcesStore], props => ({
      source: SourcesStore.getSelected(),
      data: SourcesStore.getSelectedData()
    }))
  }

  render(){
    if(this.state.source){
      return <div>
        {this.state.data ? <Table data={this.state.data}/> : "Loading..."}
      </div>
    } else {
      return null;
    }
  }
}
