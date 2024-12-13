import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import OpeningPage from './OpeningPage';
import AuthPage from './AuthPage';
import HomePage from './HomePage';
import NewsPage from './NewsPage';
import LoanPage from './LoanPage';
import ProfilePage from './ProfilePage';
import ApprovePage from './ApprovePage';
import AboutUs from './AboutUs';
import Predict from './Predict';
import Chart from './chart';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Conditional rendering of Navbar (You can decide based on login state) */}
        
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          <Route path="/home" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/loan" element={<LoanPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/approve" element={<ApprovePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/chart" element={<Chart />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;


