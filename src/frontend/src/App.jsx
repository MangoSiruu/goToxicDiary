import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChallengeDetailView from "./components/features/ChallengeDetailView/ChallengeDetailView";
import MyChallengeListView from './components/features/MyChallengeListView/MyChallengeListView';
import NewMyChallengeView from './components/features/NewMyChallengeView/NewMyChallengeView';
import Login from './utils/FakeLogin/Login';


function App() {
  return (
    <div style={{ backgroundColor: '#FBF4EE' }}>
    
    <Login/>
    
    <Router>
      <Routes>
        <Route path="/mychallengelistview" element={<MyChallengeListView />} />
        <Route path="/newmychallengeview" element={<NewMyChallengeView />} />
        <Route path="/challengedetailview/:id" element={<ChallengeDetailView />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
