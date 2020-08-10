import React from "react"
import {DirectionsService, DirectionsRenderer ,DistanceMatrixService} from "@react-google-maps/api"


function NearbyTable(props) {
  console.log(props.origin)
  console.log(props.destination)

  return(
    <div>
    {
            (props.origins!==[]) && props.results ===null && (
                <DistanceMatrixService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destinations: props.destinations, 
                    origins: props.origins,
                    travelMode: "WALKING"
                  }}
                   // required
                  callback={props.distancesCallback}
                  results ={props.results}
                />)
      }
       {
              ( 
               props.destination !== '' &&
                props.clickedStation !== ''
              ) && (
                <DirectionsService
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destination: props.destination,
                    origin: props.clickedStation,
                    travelMode: "WALKING"
                  }}
                  // required
                  callback={props.directionsCallback}
                />
              )
            }        
            {
             (props.response!==null)&& (
                <DirectionsRenderer
                  // required
                  options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    directions: props.response,
                  }}
                />
                
              )
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
                    value={station.name}
                    ref={props.getStation}
                  >
                    <td style={{padding: 5}}>
                      <a value={station.name} className='btn waves-effect waves-light z-depth-3 resultsBtn' type='button' onClick={props.onClick} style={{padding: 10}}>
                       {station.name}  
                    </a> 
                    </td>
                    <td>{station.distanceText}</td>
                    <td>{station.currentData.bikes}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
    )
}

export default NearbyTable