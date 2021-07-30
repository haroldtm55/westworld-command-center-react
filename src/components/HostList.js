import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = ({hosts, selectedHostId, handleClick, hostsToFilterByArea, area}) => {

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