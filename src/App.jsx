
import { useContext, useState } from 'react'
import NavBar from './components/layout/Navbar';
import DashboardView from './components/dashboard/DashboardView';
import AddProjectModal from './components/ui/AddProjectModal';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Route ,Routes } from 'react-router-dom'
import ProjectDetailsView from './components/project-datails/ProjectDatailsView';
import { ProjectContext } from './contexts/ProjectContext';
function App() {


  return (
    <>
   
  <NavBar/>


  
   <Routes>
<Route path='/' element={<DashboardView/>}/>
<Route path='/projects/:id' element={<ProjectDetailsView/>} />
   </Routes>
  
           <AddProjectModal/>
           
    </>
  )
}

export default App
