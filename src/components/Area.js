import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList';


function Area ({area, hosts, handleClick, selectedHostId}) {
  
  const labelAreas = () => {
    switch(area.name) {
      case "high_plains": return 'High Plains'
      case "python_pass": return 'Python Pass'
      case "lowlands": return 'Lowlands'
      case "under_construction": return 'Under Construction'
      case "pariah": return 'Pariah'
      case "badlands": return 'Badlands'
      default: return 'High Plains'
    }
  }

  const renderHostsLists = () => <HostList hostsToFilterByArea={hosts} area={area} handleClick={handleClick} selectedHostId={selectedHostId}/>

  return (
    <div className='area' id={area.name}>
      <h3 className='labels'>{labelAreas()}</h3>
      {renderHostsLists()}
    </div>)
}

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;












// const Area = ({area}) => {
  
//   const labelAreas = () => {
//     switch(area.name) {
//       case "high_plains": return 'High Plains'
//       case "python_pass": return 'Python Pass'
//       case "lowlands": return 'Lowlands'
//       case "under_construction": return 'Under Construction'
//       case "pariah": return 'Pariah'
//       case "badlands": return 'Badlands'
//     }
//   }
  
//   return (
  
//   <div className='area' id={area.name}>
//     <h3 className='labels'>{labelAreas()}</h3>

//     {/* See Checkpoint 1 item 2 in the Readme for a clue as to what goes here */}

//   </div>)

// }
