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

// const Host = ({index, host, handleClick, handleHostClick}) => {
//   const [{nameOfClass}, setNameOfClass] = useState({nameOfClass: 'host'})

//   const toggleClassName = () => {
//     nameOfClass=== 'host' ? setNameOfClass({nameOfClass: 'host selected'}) : setNameOfClass({nameOfClass: 'host'})
//   }

//   return(
//     <Card
//       className={nameOfClass}
//       // {/* NOTE: The className "host selected" renders a different style than simply "host". */}
//       onClick={()=>{toggleClassName();handleClick(index);handleHostClick(index)}}
//       image={host.imageUrl}
//       raised
//     />
//   )
// }

// export default Host
