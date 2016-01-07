import React from "react";

export class Container extends React.Component {
  render(){
    return <div className="container">{this.props.children}</div>;
  }
}

export class Row extends React.Component {
  render(){
    return <div className="row">{this.props.children}</div>;
  }
}

export class Col extends React.Component {
  render(){
    let size = this.props.s || this.props.size;
    return <div
      className={`col col-${size}`}>
      {this.props.children}
    </div>;
  }
}
