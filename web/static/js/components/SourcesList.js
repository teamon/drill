import React from "react";
import Button from "./Button"

export default class SourcesList extends React.Component {
  render(){
    if(this.props.sources){
      const sourceSelected = (source) => this.props.selected && this.props.selected.id == source.id

      return <div>
        {this.props.sources.map((source) =>
          <div className={"source" + (sourceSelected(source) ? " source-selected" : "")} key={source.id}>
            {source.name}
            <Button onClick={this.props.onSourceSelect.bind(this, source)}>Browse</Button>
          </div>
        )}
      </div>
    } else {
      return <div>No sources</div>
    }
  }
}
