import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

function WestworldMap({areas,hosts,handleClick,selectedHostId}) {

  const renderAreas = () => (
    areas.map((area,idx) => <Area key={idx} area={area} hosts={hosts} handleClick={handleClick} selectedHostId={selectedHostId}/>)
  )
    return (
      <Segment id="map" >
        {renderAreas()}
      </Segment>
    )
}

export default WestworldMap