import React from 'react'
import { connect } from 'react-redux'

import {Container, Row, Col} from "./grid"

import SourcesList    from "./SourcesList"
import SourceBrowser  from "./SourceBrowser"
import NewSource      from "./NewSource"
import Button         from "./Button"

import { fetchSources, selectSource } from "../actions"

@connect(state => ({
  sources: state.sources,
  selectedSource: state.selectedSource,
  selectedSourceData: state.selectedSourceData
}))
export default class App extends React.Component {
  handleReloadSources = () => {
    this.props.dispatch(fetchSources())
  }

  componentDidMount(){
    this.props.dispatch(fetchSources())
  }

  handleSourceSelect = (source) => {
    this.props.dispatch(selectSource(source))
  }

  render(){
    return <Container>
      <Row>
        <Col s={2}>
          <SourcesList
            sources={this.props.sources}
            selected={this.props.selectedSource}
            onSourceSelect={this.handleSourceSelect}/>
          <Button onClick={this.handleReloadSources}>Reload Sources</Button>
        </Col>
        <Col s={10}>
          <SourceBrowser
            source={this.props.selectedSource}
            data={this.props.selectedSourceData}/>
        </Col>
      </Row>
    </Container>
  }
}
