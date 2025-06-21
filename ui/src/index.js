import React from 'react';
import './index.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Home from './components/home'
import authHandler from './auth/authHandler';
import { AddListings } from './components/addListings';
import { ViewListings } from './components/viewListings';
import { ManageListings } from './components/manageListings';
export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route index path="" element={<Login auth={authHandler}/>} />
            <Route index path="login" element={<Login auth={authHandler}/>} />
            <Route path="register" element={<Register auth={authHandler}/>} />
            <Route path="home" element={<Home auth={authHandler}/>} />
            <Route path="addListing" element={<AddListings auth={authHandler} />} />
            <Route path="allListings" element={<ViewListings auth={authHandler}/>} />
            <Route path="myListings" element={<ManageListings auth={authHandler} />} />
        </Routes>
      </BrowserRouter>
    );
  }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
