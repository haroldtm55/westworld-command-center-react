import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

//CLASS MODE
class WestworldMap extends React.Component {
  // componentDidMount() {
  //   this.fetchAreas()
  // }

   
  // fetchAreas = () => {
  //   fetch('http://localhost:4000/areas')
  //     .then(resp => resp.json())
  //     .then(areas=> {
  //       this.setState({areas})
  //     })
  // }

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



// countAreas = () => {
  //   const repeatingAreas = [...this.props.hosts.map(host => host.area)]
  //   const areas = [...this.state.areas]
  //   const obj = {}
  //   console.log(areas)
  //   areas.forEach(area => {
  //     obj[area.name] = repeatingAreas.filter(repeatingArea=> repeatingArea === area.name).length
  //   })
  //   console.log(obj)
  //   this.setState({
  //     quantityPerArea: obj
  //   })
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.areaChange !== this.props.areaChange || this.state.quantityPerArea === null) {
  //     this.countAreas()
  //   }
  // }