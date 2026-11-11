import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import MissionVision from './pages/missionpage';
import Media from './pages/mediapage';
import Team from './pages/teampage';
import AdminLoginPage from './pages/adminloginpage';
import AdminSignupPage from './pages/adminsignuppage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<MissionVision />} />
      <Route path="/mission" element={<MissionVision />} />
      <Route path="/media" element={<Media />} />
      <Route path="/team" element={<Team />} />
      <Route
        path="/news"
        element={
          <div className="min-h-screen bg-white py-24 text-center text-[#16803c]">
            <h1 className="text-4xl font-bold">News</h1>
            <p className="mt-4 text-[#555]">Coming soon.</p>
          </div>
        }
      />
      <Route
        path="/contact"
        element={
          <div className="min-h-screen bg-white py-24 text-center text-[#16803c]">
            <h1 className="text-4xl font-bold">Contact</h1>
            <p className="mt-4 text-[#555]">Coming soon.</p>
          </div>
        }
      />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/signup" element={<AdminSignupPage />} />
    </Routes>
  );
}

export default App;