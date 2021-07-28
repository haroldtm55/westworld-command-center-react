import React from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'


class Headquarters extends React.Component {

  render() {
    const [{hosts, toggle, selectedHostId, handleClick, handleChange, allHostsActivated, activateOrDecomissionAll, logs}] = [this.props]
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
  
        <ColdStorage hosts={hosts} handleClick={handleClick} selectedHostId={selectedHostId}/>
  
        </Grid.Column>
        <Grid.Column width={5}>
          <Details selectedHost={hosts.find(host => host.id === selectedHostId)} toggle={toggle} handleChange={handleChange}/>
        </Grid.Column>
        <Grid.Column width={3}>
  
        <LogPanel hosts={hosts} allHostsActivated={allHostsActivated} activateOrDecomissionAll={activateOrDecomissionAll} logs={logs}/>
  
        </Grid.Column>
      </Grid>
    ) 
  }
}

export default Headquarters;