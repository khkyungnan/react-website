import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ListPage from './ListPage';
import CreatePage from './CreatePags';

const App = () => {
  const [actions, setActions] = useState([]);

  const addAction = (newAction) => {
    setActions([...actions, newAction]);
  };

  const deleteAction = (id) => {
    setActions(actions.filter((action) => action.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">List</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<ListPage actions={actions} deleteAction={deleteAction} />}
          />
          <Route
            path="/create"
            element={<CreatePage addAction={addAction} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
