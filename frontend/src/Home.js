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
    navigate('/camera')
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Set your monthly budget:</p>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder={1000}
          type="number" 
          value={budget} 
          onChange={(e) => setBudget(e.target.value)} 
        />
        <input type="submit" value="Continue" />
      </form>
    </div>
    
  )
}

export default Home;