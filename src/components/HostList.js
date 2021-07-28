import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'


// class HostList extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       numberOfActiveHosts: ''
//     }
//   }

//   returnHostComponentAndProps = (hostId, host, idx) => {
//    if (hostId === host.id) {
//      return <Host key={idx} host={host} handleClick={this.props.handleClick} nameForClass={'host selected'}/>
//    } else {
//      return <Host key={idx} host={host} handleClick={this.props.handleClick} nameForClass={'host'}/>
//    }
//  }
  
//   renderHosts = (hostId) => {
//     if (this.props.hosts) {
//       return this.props.hosts.filter(host => !host.active).map((host,idx)=> this.returnHostComponentAndProps(hostId, host, idx))
//     } 
//     else if (this.props.hostsToFilterByArea) {
//       const numberOfActiveHosts = this.props.hostsToFilterByArea.filter(host => host.active && host.area === this.props.area.name).map((host,idx) => this.returnHostComponentAndProps(hostId, host, idx))
//       return numberOfActiveHosts
//     }
//   }

//  render() {  
//   return (
//       <Card.Group itemsPerRow={6}>
//         {this.renderHosts(this.props.selectedHostId)}
//       </Card.Group>
//     )
//   }
// }

// export default HostList



function HostList ({hosts, selectedHostId, handleClick, hostsToFilterByArea, area}) {

   const returnHostComponentAndProps = (hostId, host, idx) => {
    if (hostId === host.id) {
      return <Host key={idx} host={host} handleClick={handleClick} nameForClass={'host selected'}/>
    } else {
      return <Host key={idx} host={host} handleClick={handleClick} nameForClass={'host'}/>
    }
  }
  
  const renderHosts = (hostId) => {
    if (hosts) {
      return hosts.filter(host => !host.active).map((host,idx)=> returnHostComponentAndProps(hostId, host, idx))
    } else if (hostsToFilterByArea) {
      return hostsToFilterByArea.filter(host => host.active && host.area === area.name).map((host,idx) => returnHostComponentAndProps(hostId, host, idx))
    }
  }

  return (
    <Card.Group itemsPerRow={6}>
      {renderHosts(selectedHostId)}
    </Card.Group>
  )
}

export default HostList