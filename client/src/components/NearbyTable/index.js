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
              <th className="columnTitle" id="locationColumn">Location</th>
              <th className="columnTitle" id="distanceColumn">Distance</th>
              <th className="columnTitle" id="bikesColumn">Bikes</th>
          </tr>
        </thead>

        <tbody  className="white">
                {(props.closestSations.map(station =>
                  <tr
                    key={station.name}
                    value = {station.name}
                  >
                    <td style={{padding: 5}}>
                      <a id={station.name} className='btn waves-effect waves-light z-depth-3 resultsBtn' type='button' onClick={props.onClick} style={{padding: 10}}>
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