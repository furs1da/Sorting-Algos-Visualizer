import logo from './logo.svg';
import './App.css';
import React from 'react'
import Loading from './components/Loading'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { useGlobalContext } from './context'



function App() {
  const {loading, completed} = useGlobalContext();

  if(loading || !completed) {
    return (
    <div className="App">
        <Loading/>
    </div>
    )
  }

  return (
    <div className="App">
      <NavBar/>
      <Footer/>
    </div>
  );
}

export default App;
