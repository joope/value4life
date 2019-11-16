import React, {useState} from 'react';
import { navigate } from "@reach/router";



function Summary() {

    
  return (
    <div>
      <h1>Spending summary</h1>
      <div>
        <p>Original price:</p>
        <p>Lifetime value</p>
        <ul>
            <li>Student lunches - 52€/month</li>
            <li>Spotify - 5€/month</li>
        </ul>
      </div>
    </div>
    
  )
}

export default Summary;