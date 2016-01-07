import React from 'react'
import {Container, Row, Col} from "./grid"
import SourcesList    from "./SourcesList"
import SourceBrowser  from "./SourceBrowser"
import NewSource      from "./NewSource"

import Button from "./Button"
import {actions} from "../actions"

export default class App extends React.Component {
  render(){
    return <Container>
      <Row>
        <Col s={2}>
          <SourcesList/>
          <NewSource/>
          <Button onClick={actions.loadSources}>Reload Sources</Button>
        </Col>
        <Col s={10}>
          <SourceBrowser/>
        </Col>
      </Row>
    </Container>
  }
}
