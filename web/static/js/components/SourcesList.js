import React from "react";
import FluxComponent from "../utils/FluxComponent"
import SourcesStore from "../stores/SourcesStore"
import {actions} from "../actions"

import Button from "./Button"

export default class SourcesList extends FluxComponent {
  constructor(props){
    super(props);

    this.flux([SourcesStore], props => ({
      sources: SourcesStore.getSources(),
      selected: SourcesStore.getSelected()
    }))

    actions.loadSources()
  }

  handleSelect = (source) => {
    actions.selectSource(source)
  }

  render(){
    const sourceSelected = (source) => this.state.selected && this.state.selected.id == source.id

    return <div>
      {this.state.sources.map((source) =>
        <div className={"source" + (sourceSelected(source) ? " source-selected" : "")} key={source.id}>
          {source.name}
          <Button onClick={this.handleSelect.bind(this, source)} disabled={this.state.loading}>Browse</Button>
        </div>
      )}
    </div>
  }
}
