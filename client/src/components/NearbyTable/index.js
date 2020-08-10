import React from "react"
import {DistanceMatrixService} from "@react-google-maps/api"


function NearbyTable(props) {
    console.log(props.closestSations)

  return(
    <div>
    {
            (props.origins!==[]) &&(
                <DistanceMatrixService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destinations: props.destinations, 
                    origins: props.origins,
                    travelMode: "WALKING"
                  }}
                   // required
                  callback={props.distancesCallback}
                />)
          }
          
        <table className='row z-depth-5'>
        <thead className="thead">
          <tr>
              <th>Location</th>
              <th>distance</th>
              <th>bikes</th>
          </tr>
        </thead>

        <tbody  className="white">
                {(props.closestSations.map(station =>
                  <tr
                    key={station.name}
                    value = {station.name}
                  >
                    <td>
                      <a id={station.name} className='btn waves-effect waves-light z-depth-5' type='button' onClick={props.onClick}>
                       {station.name}  
                    </a> 
                    </td>
                    <td>{station.distanceText}</td>
                    <td>{station.bikes}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
    )
}

export default NearbyTable