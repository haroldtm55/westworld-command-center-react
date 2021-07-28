import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

class WestworldMap extends React.Component {

  renderAreas = () => {
    return this.props.areas.map((area,idx) => <Area key={idx} area={area} hosts={this.props.hosts} handleClick={this.props.handleClick} selectedHostId={this.props.selectedHostId}/>)
  }

  

  render() {
    return (
      <Segment id="map" >
        {this.renderAreas()}
      </Segment>
    )
  }
  
}

export default WestworldMap