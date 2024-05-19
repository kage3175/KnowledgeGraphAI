import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const handleIncrement = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/increment/', { number });
      setResult(response.data.result);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <input type="number" value={number} onChange={(e) => setNumber(Number(e.target.value))} />
      <button onClick={handleIncrement}>Increment</button>
      {result !== null && <span>Result: {result}</span>}
    </div>
  );
}

export default App;
