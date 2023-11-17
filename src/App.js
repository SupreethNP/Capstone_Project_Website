// import logo from './logo.svg';
// import ReactDOM from 'react-dom/client';
import Home from "./pages/home";
import Login from './pages/login';
import Signup from './pages/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useState} from 'react';

import './App.css';

function App() {
  const [name,setName]=useState('');
  const [age,setAge]=useState('');
  const [gender,setGgender]=useState('');
  const [fileimg,setFile]=useState('');
  const [filename,setFilename]=useState('');
  const [uploadedfile,setuploadedfile]=useState({});
  const [downloadfile,setdownloadfile]=useState({});
 
    

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home name={name} setname={setName} age={age} setage={setAge} gender={gender} setgender={setGgender} file={fileimg} setfile={setFile} filename={filename} setfilename={setFilename} uploadedfile={uploadedfile} setuploadedfile={setuploadedfile} downloadfile={downloadfile} setdownloadfile={setdownloadfile}/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </Router>

  );

  
}

export default App;



