import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChallengeDetail from "./components/features/ChallengeDetail/ChallengeDetail";
import MyChallengeList from './components/features/MyChallengeList/MyChallengeList';
import NewMyChallenge from './components/features/NewMyChallenge/NewMyChallenge';
import Login from './utils/FakeLogin/Login';


function App() {
  return (
    <div style={{ backgroundColor: '#FBF4EE' }}>
    
    <Login/>
    
    <Router>
      <Routes>
        <Route path="/mychallengelist" element={<MyChallengeList />} />
        <Route path="/newmychallenge" element={<NewMyChallenge />} />
        <Route path="/challengedetail/:id" element={<ChallengeDetail />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
