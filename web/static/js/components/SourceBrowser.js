import React from "react";
import Table from "./Table"

export default class SourceBrowser extends React.Component {
  render(){
    if(this.props.source){
      return <div>
        {this.props.data ? <Table data={this.props.data}/> : "Loading..."}
      </div>
    } else {
      return null;
    }
  }
}
