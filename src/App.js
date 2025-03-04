import React, { useEffect, useState } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
import { Log } from './services/Log'

const FETCH_URL = 'http://localhost:7000/'

const App = () => {
  const [hosts, setHosts] = useState([])
  const [selectedHostId, setSelectedHostId] = useState(null)
  const [areas, setAreas] = useState([])
  const [allHostsActivated, setAllHostsActivated] = useState(false)
  const [logs, setLogs] = useState([])
  
  useEffect(()=> {
    fetchHosts()
    fetchAreas()
  },[])

  useEffect(()=> {
    const defineActivateOrDecomissionAllButton = () => (
      hosts.find(host => !host.active) === undefined ? setAllHostsActivated(true) : setAllHostsActivated(false)
    )
    defineActivateOrDecomissionAllButton()
  },[hosts])

  const fetchHosts = () => {
    fetch(FETCH_URL+'hosts')
      .then(resp => resp.json())
      .then(hosts=> {
        setHosts(hosts)
      })
      .catch(err => console.log(err))
  }

  const fetchAreas = () => {
    fetch(FETCH_URL+'areas')
      .then(resp => resp.json())
      .then(areas=> {
        setAreas(areas)
      })
  }

  const handleClick = (hostId) => setSelectedHostId(hostId)

  const toggle = (selectedHost) => {
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
    fetch(FETCH_URL+'hosts/'+selectedHost.id,configObj)
      .then(fetchHosts)

      if (!selectedHost.active) {
        setLogs([Log.warn(`Activated ${selectedHost.firstName}`),...logs])
      } else {
        setLogs([Log.notify(`Decomissioned ${selectedHost.firstName}`),...logs])
      }
  }

  const handleChange = (e, {value}, selectedHost) => {
    const areaName = e.target.textContent
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
    if (getLimitOfArea(value)> getNumOfHostsOfArea(value)) {
      fetch(FETCH_URL+'hosts/'+selectedHost.id,configObj)
        .then(fetchHosts)
      setLogs([Log.notify(`${selectedHost.firstName} set in area ${areaName}`),...logs])  
    } else {
      setLogs([Log.error(`Too many hosts. Cannot add ${selectedHost.firstName} to ${areaName}`),...logs])
    }
  }

  const getNumOfHostsOfArea = (name) => {
    return hosts.reduce((acc, cur) => {
      if (cur.area === name) {
        return acc + 1
      }
      return acc
    }, 0)
  }

  const getLimitOfArea = (name) => {
    const area = areas.find(area => area.name === name)
    return area ? area.limit : 0
  }

  const activateOrDecomissionAll = () => {
    
    hosts.map(host => {
      return fetch(FETCH_URL+'hosts/'+host.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          active: !allHostsActivated
        })
      }).then(fetchHosts)
    })
    setAllHostsActivated(!allHostsActivated)
    if (!allHostsActivated) {
      setLogs([Log.warn('Activating all hosts'),...logs])
    } else {
      setLogs([Log.notify('Decomissioning all hosts'),...logs])
    }
  }
    return (
      <Segment id='app'>
        <WestworldMap 
          hosts={hosts} 
          handleClick={handleClick} 
          selectedHostId={selectedHostId}
          areas={areas}
          />
        <Headquarters 
          hosts={hosts} 
          handleClick={handleClick} 
          selectedHostId={selectedHostId} 
          toggle={toggle} 
          handleChange={handleChange}
          allHostsActivated={allHostsActivated}
          activateOrDecomissionAll={activateOrDecomissionAll}
          logs={logs}/>
      </Segment>
    )
}

export default App;

// CLASS MODE
// class App extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       hosts: [],
//       selectedHostId: null,
//       areas: [],
//       allHostsActivated: false,
//       logs: []
//     }
//   }
//   componentDidMount() {
//      this.fetchHosts()
//      this.fetchAreas()
//   }

//   fetchHosts = () => {
//     fetch(FETCH_URL+'hosts')
//       .then(resp => resp.json())
//       .then(hosts=> {
//         this.setState({
//           hosts:hosts
//         },()=>this.defineActivateOrDecomissionAllButton())
//       })
//       .catch(err => console.log(err))
//   }

//   defineActivateOrDecomissionAllButton = () => {
//     if (this.state.hosts.find(host => !host.active) === undefined) {
//       this.setState({allHostsActivated: true})
//     } else  this.setState({allHostsActivated: false})
//   }

//   fetchAreas = () => {
//     fetch(FETCH_URL+'areas')
//       .then(resp => resp.json())
//       .then(areas=> {
//         this.setState({areas})
//       })
//   }

//   handleClick = (hostId) => {
//     this.setState({
//       selectedHostId: hostId
//     })
//   }

//   toggle = (selectedHost) => {
//     const flipHostStatus = {
//       active: !selectedHost.active
//     }
//     const configObj = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(flipHostStatus)
//     }
//     fetch(FETCH_URL+'hosts/'+selectedHost.id,configObj)
//       .then(this.fetchHosts)

//       if (!selectedHost.active) {
//         this.setState(prevState => {
//           return {
//             logs: [Log.warn(`Activated ${selectedHost.firstName}`),...prevState.logs]
//           }
//         })
//       } else {
//         this.setState(prevState => {
//           return {
//             logs: [Log.notify(`Decomissioned ${selectedHost.firstName}`),...prevState.logs]
//           }
//         })
//       }
//   }

//   handleChange = (e, {value}, selectedHost) => {
//     const areaName = e.target.textContent
//     const newArea = {
//       area: value
//     }
//     const configObj = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newArea)
//     }
//     if (this.getLimitOfArea(value)> this.getNumOfHostsOfArea(value)) {
//       fetch(FETCH_URL+'hosts/'+selectedHost.id,configObj)
//         .then(this.fetchHosts)
        
//       this.setState(prevState => {
//         return {
//           logs: [Log.notify(`${selectedHost.firstName} set in area ${areaName}`),...prevState.logs]
//         }
//       })
//     } else {
//       this.setState(prevState => {
//         return {
//           logs: [Log.error(`Too many hosts. Cannot add ${selectedHost.firstName} to ${areaName}`),...prevState.logs]
//         }
//       })
//     }
//   }

//   getNumOfHostsOfArea = name => {
//     return this.state.hosts.reduce((acc, cur) => {
//       if (cur.area === name) {
//         return acc + 1
//       }
//       return acc
//     }, 0)
//   }

//   getLimitOfArea = (name) => {
//     const area = this.state.areas.find(area => area.name === name)
//     return area ? area.limit : 0
//   }

//   activateOrDecomissionAll = () => {
        
//     // Option 1
//     // save all the promises into an array then use Promise.all
//     // which ensures it only fetch new hosts after all fetches are resolved
//     const allDone = this.state.hosts.map(host => {
      
//       return fetch(FETCH_URL+'hosts/'+host.id, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           active: !this.state.allHostsActivated
//         })
//       })
//     })

//     this.setState(prevState => {
//       return {
//         allHostsActivated: !prevState.allHostsActivated
//       }
//     }, () => this.setState(prevState => {
//       if (this.state.allHostsActivated) {
//         return {
//           logs: [Log.warn('Activating all hosts'),...prevState.logs]
//         }
//       } else {
//         return {
//           logs: [Log.notify('Decomissioning all hosts'),...prevState.logs]
//         }
//       }
//     })
//   )
//     Promise.all(allDone)
//       .then(() => {
//         this.fetchHosts()
//       })
//     // Option 2: simply wait for a few seconds then fetch
//     // setTimeout(() => {
//     //   this.fetchHosts()
//     // }, 3000);
//   }

//   render() {
//     return (
//       <Segment id='app'>
//         <WestworldMap 
//           hosts={this.state.hosts} 
//           handleClick={this.handleClick} 
//           selectedHostId={this.state.selectedHostId}
//           areas={this.state.areas}
//           />
//         <Headquarters 
//           hosts={this.state.hosts} 
//           handleClick={this.handleClick} 
//           selectedHostId={this.state.selectedHostId} 
//           toggle={this.toggle} 
//           handleChange={this.handleChange}
//           allHostsActivated={this.state.allHostsActivated}
//           activateOrDecomissionAll={this.activateOrDecomissionAll}
//           logs={this.state.logs}/>
//       </Segment>
//     )
//   }
// }

// export default App;