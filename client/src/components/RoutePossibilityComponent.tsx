import React, { useRef, useState } from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';
import CalculateRoutePossibilities from '../utils/CalculateRoutePossibilities';

function RoutePossibilityComponent() {
  const inputRef = useRef<HTMLInputElement>();
  
  const [tableBody, setTableBody] = useState<JSX.Element[]>([<tr>
    <th scope="row">.</th>
    <td>..</td>
    <td>...</td>
    <td>....</td>
  </tr>]);

  const [tableHeader, setTableHeader] = useState<JSX.Element>(<tr>
    <th scope="col">Route</th>
    <th scope="col">Nr. of stops</th>
    <th scope="col">Total cost</th>
  </tr>);
  
  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        calculateTable();
      }
    }
  const calculateTable = () => {
    if(inputRef.current)
    createPossibleRouteResult(CalculateRoutePossibilities(inputRef.current.value));
    
  }
  const tableClick = (route : DeliveryRoute[]) =>{
      console.log(route);
      const row: JSX.Element[] = [];
      route.forEach(item => {
         row.push(<tr onClick={() =>tableClick(route)}>
        <th scope="row">{route.indexOf(item) +1}</th>
        <td>{item.node_ofOrigin}</td>
        <td>{item.node_ofDestination}</td>
        <td>{item.cost}</td>
        </tr>);
      
      });
      setTableHeader(<tr>
        <th scope="col">Stop</th>
        <th scope="col">From</th>
        <th scope="col">To</th>
        <th scope="col">Cost</th>
      </tr>);
      setTableBody(row);
    }
    const createPossibleRouteResult = (possibleRoutes : DeliveryRoute[][]) => {
      console.log(possibleRoutes);
      const row: JSX.Element[] = [];
      
      possibleRoutes.forEach(route => {
      let sum = 0;
      route.forEach(item => {
        sum += item.cost;
      });
         row.push(<tr onClick={() =>tableClick(route)} >
        <th scope="row">{possibleRoutes.indexOf(route) +1}</th>
        <td>{route.length}</td>
        <td>{sum}</td>
      </tr>);
    });
      setTableHeader(<tr>
        <th scope="col">Route</th>
        <th scope="col">Nr. of stops</th>
        <th scope="col">Total cost</th>
      </tr>);
      setTableBody(row);
      
    }
    return (<>
      <div className='row  col-sm-12  col-lg-8 d-flex flex-colum justify-content-between mx-auto case'>
      <div className='col-12 text-center mx-auto'><span><strong> CASE 2 </strong></span></div>
        <label className='col-4 text-center'><strong> Possible routes: </strong></label>
          <input
            ref={inputRef as React.LegacyRef<HTMLInputElement>}
            className='col-4 '
            type="text"
            placeholder='For example "E-E"'
            maxLength={3}
            onKeyPress={onKeyPress}
          />
          <button className='col-4' onClick={calculateTable}>check routes</button>
          {tableBody.length > 1 ? <div className='col-12 text-center mx-auto'><span><em> click table row for route details </em></span></div> : <></>}
          <div className='row col-12 mx-auto'>
        <table className=" table table-striped ">
          
        <thead className="thead">
          {tableHeader}
        </thead>
        <tbody >
          {tableBody}
        </tbody>
        </table>
          
      </div>
        </div>
        
      </>)
}

export default RoutePossibilityComponent