class App extends React.Component {

  constructor() {
    super()
    this.state = {
      hosts: [],
      selectedHostId: null,
      areas: [],
      hostsPerArea: {},
      areaLabels: ['badlands', 'high_plains', 'lowlands', 'pariah', 'python_pass', 'under_construction']
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

        const repeatingAreas = [...this.state.hosts.map(host => host.area)]
        const copyOfareas = [...this.state.areaLabels]
        const obj = {}
      
        copyOfareas.forEach(area => {
          obj[area] = repeatingAreas.filter(repeatingArea=> repeatingArea === area).length
        })
         //Sort By Key
        const sortedObj = Object.keys(obj)
          .sort()
          .reduce((acc, key) => ({
              ...acc, [key]: obj[key]
          }), {})
        console.log(sortedObj)
        this.setState({
          hostsPerArea: sortedObj
        })
      })
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
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
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
    const copyOfareas = [...this.state.areas]
    const limits = {}
    copyOfareas.forEach(area => {
      limits[area.name] = area.limit
    })
    const sortedLimits = Object.keys(limits)
      .sort()
      .reduce((acc, key) => ({
          ...acc, [key]: limits[key]
      }), {})
    
    console.log(this.state.hostsPerArea)
    for (let i = 0; i<Object.keys(sortedLimits).length; i++) {
      
      if (Object.values(sortedLimits)[i]< Object.values(this.state.hostsPerArea)[i]) {
        break
      }
      else {
        fetch(`http://localhost:4000/hosts/${selectedHost.id}`,configObj)
          .then(this.fetchHostsAndHandleHostPerArea)
      }
    }
  }

  checkLimits = () => {
    const copyOfareas = [...this.state.areas]
    const limits = {}
    copyOfareas.forEach(area => {
      limits[area.name] = area.limit
    })
  }

  render() {
    // this.checkLimits()
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
          handleChange={this.handleChange}/>
      </Segment>
    )
  }
}

export default App;