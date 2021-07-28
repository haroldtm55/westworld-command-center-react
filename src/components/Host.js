import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

function Host ({host,nameForClass,handleClick})  {
    return(
      <Card
        className={nameForClass}
        onClick={()=>handleClick(host.id)}
        image={host.imageUrl}
        raised
      />
    )
}

export default Host
