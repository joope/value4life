import React, {useState} from 'react';
import { navigate } from "@reach/router";

export const getBudget = () => {
  return window.localStorage.getItem('budget') || 1000;
}

const saveBudget = (budget) => {
  window.localStorage.setItem('budget', budget);
}

function Home() {
  const [budget, setBudget] = useState(getBudget());

  const handleSubmit = (e) => {
    e.preventDefault();
    saveBudget(budget);
    navigate('/camera');
  }

  return (
    <div>
      <h1 className="main-header">Welcome!</h1>
      
      <form onSubmit={handleSubmit} className="welcome-form">
        <p>Set your monthly budget:</p>
        <input 
          placeholder={1000}
          type="number" 
          value={budget} 
          onChange={(e) => setBudget(e.target.value)} 
        />
        <input type="submit" value="Continue" />
      </form>

      <div>
        <h1>Existing monthly expenses</h1>
        <ul style={{listStyle: 'none'}}>
            <li>Student lunches - 52€/month</li>
            <li>Spotify - 10€/month</li>
        </ul>
      </div>
    </div>
    
  )
}

export default Home;