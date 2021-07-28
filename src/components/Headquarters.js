import React from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'


class Headquarters extends React.Component {

  render() {
    const [{hosts, toggle, selectedHostId, handleClick, handleChange, allHostsActivated, activateOrDecomissionAll}] = [this.props]
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
  
        <ColdStorage hosts={hosts} handleClick={handleClick} selectedHostId={selectedHostId}/>
  
        </Grid.Column>
        <Grid.Column width={5}>
          <Details selectedHost={hosts.find(host => host.id === selectedHostId)} toggle={toggle} handleChange={handleChange}/>
        </Grid.Column>
        <Grid.Column width={3}>
  
        <LogPanel hosts={hosts} allHostsActivated={allHostsActivated} activateOrDecomissionAll={activateOrDecomissionAll}/>
  
        </Grid.Column>
      </Grid>
    ) 
  }


}

export default Headquarters;

// function Headquarters({hosts}) {
//   // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.
//   const [selectedHostIndex, setSelectedHostIndex] = useState(null)

//   const handleClick = (hostIndex) => {
//     setSelectedHostIndex(hostIndex)
//   }
//   // console.log(hosts.length)
//   return(
//     <Grid celled='internally'>
//       <Grid.Column width={8}>

//       <ColdStorage hosts={hosts} handleClick={handleClick}/>

//       </Grid.Column>
//       <Grid.Column width={5}>
//         <Details selectedHost={hosts[selectedHostIndex]}/>
//       </Grid.Column>
//       <Grid.Column width={3}>

//       <LogPanel />

//       </Grid.Column>
//     </Grid>
//   )
  
// }

// export default Headquarters;