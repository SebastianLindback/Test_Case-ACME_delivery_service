import React from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';

function CalculateRoute(UserInput : string) {
  const {Routes} = require('../context/routes.json');
    const validRoutes : DeliveryRoute[] = Routes.map((route: string) => (
      {
      node_ofOrigin: route.substring(0,1),
      node_ofDestination : route.substring(1,2),
      cost : parseInt(route.substring(2))}
    ) )
    const formatInput = (input: string) => {
      if (!input.includes("-")) input = input.substring(0,1) + "-" + input.substring(2,1);
      return input.toUpperCase();;
    }
    const userNodes = formatInput(UserInput).split("-");
    // Match the user nodes with the valid routes
      const result = validRoutes.find(
        route => (
          (route.node_ofOrigin === userNodes[0]) 
        &&(route.node_ofDestination === userNodes[1])
        ));
    
     
    return (result)
  
  };

export default CalculateRoute