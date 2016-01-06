import React from 'react'
import ReactDOM from 'react-dom';

import API from "./api"
import {Container, Row, Col} from "./grid"


class Button extends React.Component {
  render(){
    return <button className="button" {...this.props}>{this.props.children}</button>
  }
}

class SourcesList extends React.Component {
  constructor(props){
    super(props);
    this.state = {sources: []}
    this.fetchSources();
  }

  async fetchSources(){
    let sources = await API.sources.list();
    this.setState({sources});
  }

  handleSelect = (source) => {
    this.props.onSelect(source)
  }

  render(){
    return <div>
      {this.state.sources.map((source) =>
        <div className="source" key={source.id}>
          {source.name}
          <Button onClick={this.handleSelect.bind(this, source)}>Browse</Button>
        </div>
      )}
    </div>
  }
}

class Table extends React.Component {
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

class SourceBrowser extends React.Component {
  constructor(props){
    super(props);
    this.state = {source: null}
  }
  async componentWillReceiveProps(props){
    this.setState({source: null})
    let source = await API.sources.get(props.source.id)
    this.setState({source})
  }

  render(){
    if(this.props.source){
      return <div>
        {this.state.source ? <Table data={this.state.source.data}/> : "Loading..."}
      </div>
    } else {
      return null;
    }
  }
}


class NewSource extends React.Component {
  render(){
    return <Button label="Add source"/>
  }
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedSource: null,
      selectedSourceData: null
    }
  }

  handleSelect = (source) => {
    this.setState({
      selectedSource: source
    })
  }

  render(){
    return <Container>
      <Row>
        <Col s={2}>
          <SourcesList onSelect={this.handleSelect}/>
          <NewSource/>
        </Col>
        <Col s={10}>
          <SourceBrowser source={this.state.selectedSource}/>
        </Col>
      </Row>
    </Container>
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("main")
)
