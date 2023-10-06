import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './styles/App.css';
import NavBar from './components/navigation';
import Missions from './pages/missions';
import MyProfile from './pages/myProfile';
import Rockets from './pages/rockets';
import Dragons from './pages/dragon';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <NavBar />
    <Routes basename="space_traveler">
      <Route path="/space-traveler" element={<Rockets />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/dragons" element={<Dragons />} />
      <Route path="/missions" element={<Missions />} />
    </Routes>
  </Router>
);

export default App;
