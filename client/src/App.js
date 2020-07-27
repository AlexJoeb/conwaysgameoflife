import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
        {/* ! Nav Bar Here ! */}
        {/* 
          Pages:
            - Rules of the Game
            - Cellular Automata
              - What is it and how are they useful in real life?
            - Turing Completeness
              - What is it?
            - Double Buffering
        */}
      </Router>
    </div>
  );
}


export default App;