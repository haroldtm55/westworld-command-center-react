import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'



const Details = ({selectedHost, toggle, handleChange}) => {
  const renderHostInfo = () => (
    selectedHost ? <HostInfo selectedHost={selectedHost} toggle={toggle} handleChange={handleChange}/> : <Image size='medium' src={Images.westworldLogo}/>
  )
  return(
    <Segment id="details" className="HQComps">
      {renderHostInfo()}
    </Segment>
  )
}

export default Details

