// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cafes, setCafes] = useState([]);
  const [newCafe, setNewCafe] = useState({ name: '', price: '' });

  useEffect(() => {
    const timestamp = new Date().getTime();
    axios
      .get(`http://localhost:5002/api/cafes?timestamp=${timestamp}`)
      .then((response) => setCafes(response.data))
      .catch((error) => console.error('에러입니다.', error));
  }, []);

  const addCafe = () => {
    axios
      .post('http://localhost:5002/api/cafes', newCafe)
      .then(() => {
        axios
          .get(
            `http://localhost:5002/api/cafes?timestamp=${new Date().getTime()}`
          )
          .then((response) => {
            setCafes(response.data);
            setNewCafe({ name: '', price: '' });
          })
          .catch((error) => console.error('에러입니다.', error));
      })
      .catch((error) => console.error('에러입니다.', error));
  };

  return (
    <div>
      <h1>블로그 </h1>

      <ul>
        {cafes.map((cafe) => (
          <li key={cafe[0]}>
            {cafe[1]} - {cafe[2]}원
          </li>
        ))}
      </ul>

      <h2>블로그 내용 추가하기</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newCafe.name}
          onChange={(e) => setNewCafe({ ...newCafe, name: e.target.value })}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          value={newCafe.price}
          onChange={(e) => setNewCafe({ ...newCafe, price: e.target.value })}
        />
      </div>
      <button onClick={addCafe}>추가하기</button>
    </div>
  );
}

export default App;
