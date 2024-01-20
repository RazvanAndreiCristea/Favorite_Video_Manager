import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import UserPage from './Components/Pages/User/User';
import VideoPage from './Components/Pages/Video/Video';

import './App.css';


const App = () => {
  return (
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/users" element={<UserPage/>} />
            <Route path="/videos" element={<VideoPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
};

export default App;