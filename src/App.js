import React from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      hosts: [],
      selectedHostId: null,
      areas: [],
      allHostsActivated: false
    }
  }
  componentDidMount() {
     this.fetchHostsAndHandleHostPerArea()
     this.fetchAreas()
  }

  fetchHostsAndHandleHostPerArea = () => {
    fetch('http://localhost:4000/hosts')
      .then(resp => resp.json())
      .then(hosts=> {
        this.setState({
          hosts:hosts
        })
      })
      .catch(err => console.log(err))
  }

  fetchAreas = () => {
    fetch('http://localhost:4000/areas')
      .then(resp => resp.json())
      .then(areas=> {
        this.setState({areas})
      })
  }

  handleClick = (hostId) => {
    this.setState({
      selectedHostId: hostId
    })
  }

  toggle = (selectedHost) => {
    const flipHostStatus = {
      active: !selectedHost.active
    }
    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(flipHostStatus)
    }
    fetch(`http://localhost:4000/hosts/${selectedHost.id}`,configObj)
      .then(this.fetchHostsAndHandleHostPerArea)
  }

  handleChange = (e, {value}, selectedHost) => {
    const newArea = {
      area: value
    }
    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newArea)
    }
    if (this.getLimitOfArea(value) > this.getNumOfHostsOfArea(value)) {
      fetch(`http://localhost:4000/hosts/${selectedHost.id}`,configObj)
        .then(this.fetchHostsAndHandleHostPerArea)
    }
  }

  getNumOfHostsOfArea = name => {
    return this.state.hosts.reduce((acc, cur) => {
      if (cur.area === name) {
        return acc + 1
      }
      return acc
    }, 0)
  }


  getLimitOfArea = (name) => {
    const area = this.state.areas.find(area => area.name === name)
    return area ? area.limit : 0
  }

  activateOrDecomissionAll = () => {
        
    this.state.hosts.forEach(host => {
      fetch(`http://localhost:4000/hosts/${host.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          active: !this.state.allHostsActivated
        })
      })
    })
    this.setState(prevState => {
      return {
        allHostsActivated: !prevState.allHostsActivated
      }
    })
    this.fetchHostsAndHandleHostPerArea()
  }

  render() {
    return (
      <Segment id='app'>
        <WestworldMap 
          hosts={this.state.hosts} 
          handleClick={this.handleClick} 
          selectedHostId={this.state.selectedHostId}
          areas={this.state.areas}
          // areaChange={this.state.areaChange}
          />
        <Headquarters 
          hosts={this.state.hosts} 
          handleClick={this.handleClick} 
          selectedHostId={this.state.selectedHostId} 
          toggle={this.toggle} 
          handleChange={this.handleChange}
          allHostsActivated={this.state.allHostsActivated}
          activateOrDecomissionAll={this.activateOrDecomissionAll}/>
      </Segment>
    )
  }
}

export default App;