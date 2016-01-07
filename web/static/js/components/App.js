import React from 'react'
import {Container, Row, Col} from "./grid"
import SourcesList    from "./SourcesList"
import SourceBrowser  from "./SourceBrowser"
import NewSource      from "./NewSource"

export default class App extends React.Component {
  render(){
    return <Container>
      <Row>
        <Col s={2}>
          <SourcesList/>
          <NewSource/>
        </Col>
        <Col s={10}>
          <SourceBrowser/>
        </Col>
      </Row>
    </Container>
  }
}
