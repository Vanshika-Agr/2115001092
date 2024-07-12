import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrimeNumbers = () => {
  const [primes, setPrimes] = useState([]);
  const [error, setError] = useState(null);
  const [average, setAverage] = useState(0); 

  useEffect(() => {
    const fetchPrimes = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/test/primes', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzgwMDM4LCJpYXQiOjE3MjA3Nzk3MzgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ3YTFiYmEwLWIzYWItNGU0Zi1iYTYxLTRlZDQ0MTIxZTMzZiIsInN1YiI6InZhbnNoaWthLmFncmF3YWxfY3MyMUBnbGEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJhZmZvcmRfcHJvIiwiY2xpZW50SUQiOiJkN2ExYmJhMC1iM2FiLTRlNGYtYmE2MS00ZWQ0NDEyMWUzM2YiLCJjbGllbnRTZWNyZXQiOiJLV0x6V3B5eklkUldxU0tkIiwib3duZXJOYW1lIjoiVmFuc2hpa2FhIiwib3duZXJFbWFpbCI6InZhbnNoaWthLmFncmF3YWxfY3MyMUBnbGEuYWMuaW4iLCJyb2xsTm8iOiIyMTE1MDAxMDkyIn0.Vh9U4Jvjj4xkUoa4Yyp0-T2TjuAba_iA8SlQgIz_R4c'
          }
        });
        setPrimes(response.data);
        setError(null);
      } catch (error) {
        setError('Error fetching prime numbers');
        setPrimes([]); 
      }
    };

    fetchPrimes();
  }, []);

  useEffect(() => {
    const calculateAverage = () => {
      if (primes.length > 0) {
        const sum = primes.reduce((acc, prime) => acc + prime, 0);
        const avg = sum / primes.length;
        setAverage(avg.toFixed(2));
      } else {
        setAverage(0);
      }
    };

    calculateAverage();
  }, [primes]);

  return (
    <div>
      <h2>Prime Numbers</h2>
      {error && <p>{error}</p>}
      <ul>
        {primes.map((prime, index) => (
          <li key={index}>{prime}</li>
        ))}
      </ul>
      <p>Average: {average}</p>
    </div>
  );
};

export default PrimeNumbers;
