import React from "react";

export default class Table extends React.Component {
  render(){
    if(this.props.data.length > 0){
      let keys = Object.keys(this.props.data[0])

      let thead = <thead>
        <tr>{
          keys.map(key =>
            <th key={key}>{key}</th>
          )
        }</tr>
      </thead>

      let tbody = <tbody>
        {this.props.data.map((item,index) => {
          return <tr key={index}>{
            keys.map(key =>
              <td key={key}>{this.formatValue(item[key])}</td>
            )
          }</tr>
        })}
      </tbody>

      return <table className="table">
        {thead}
        {tbody}
      </table>
    } else {
      return <div>No data</div>;
    }
  }

  formatValue(value){
    switch(typeof value){
      case "string":
        return value;
      case "number":
        return value;
      case "object":
        return this.formatObject(value);
      default:
        return JSON.stringify(value);
    }
  }

  formatObject(obj){
    return <table className="table"><tbody>{
      Object.keys(obj).map(key =>
        <tr key={key}>
          <th>{key}</th>
          <td>{this.formatValue(obj[key])}</td>
        </tr>
      )
    }</tbody></table>
  }
}
