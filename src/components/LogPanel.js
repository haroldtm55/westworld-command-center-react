import React from 'react'
import { Segment, Button } from 'semantic-ui-react';

const LogPanel = ({logs, allHostsActivated, activateOrDecomissionAll}) => {
  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
      </pre>
      
      <Button
        onClick={activateOrDecomissionAll}
        fluid
        color={allHostsActivated ? 'green' : 'red'}
        content={allHostsActivated ? "DECOMISSION ALL": "ACTIVATE ALL"}
      />
    </Segment>
  )
}

export default LogPanel
