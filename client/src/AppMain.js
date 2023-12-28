import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Component/Footer';
import Home from './Component/Home';
import Header from './Component/Header';
import MovieList from './Component/Movie/MovieList';
import NumberGuessingGame from './Component/Game/NumberGuessingGame';
import Quiz from './Component/Game/Quiz';
import TodoList from './Component/Todo/TodoList';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<MovieList />} />
            <Route path="/todos" element={<TodoList />} />
            <Route
              path="/numberGuessingGame"
              element={<NumberGuessingGame />}
            />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
