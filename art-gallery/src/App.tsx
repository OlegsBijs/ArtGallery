import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import ArtDetails from './components/ArtDetails';
import './App.css';
import { ArtProvider } from './context/ArtContext'; // Import the ArtProvider

const App: React.FC = () => {
  return (
    <Router>
      <ArtProvider>
        <Routes>
          <Route path='/'element={<Gallery />} />
          <Route path='/art/:id'element={<ArtDetails />} />
        </Routes>
      </ArtProvider>
    </Router>
  );
};

export default App;
