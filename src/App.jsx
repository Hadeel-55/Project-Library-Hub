import { useState } from 'react'
import NavBar from './components/layout/Navbar';
import DashboardView from './components/dashboard/DashboardView';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Route ,Routes } from 'react-router-dom'
function App() {


  return (
    <>
     <NavBar/>
     <DashboardView/>
    </>
  )
}

export default App
