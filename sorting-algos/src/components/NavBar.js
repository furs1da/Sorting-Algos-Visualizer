import React, { useState, useContext, useEffect, useReducer } from 'react'
import { useGlobalContext } from '../context'
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import Lottie from "lottie-react";
import * as scales from "../lotties/lf20_036hc3zw.json";


const NavBar = () => {
  
  const [animation, setAnimation] = useState(false);

  const startAnimation = () => {
      setAnimation(true);
  }
  const endAnimation = () => {
    setAnimation(false);
}

  return (
    <div className='header'>
        <MDBFooter color="teal accent-4" className="font-small mb-1">
          <div className="text-center py-1">
            <MDBContainer fluid onMouseEnter={startAnimation} onMouseLeave={endAnimation}>
              <div className='header-block'><h3 className='header-text'>Sorting Algorithms Visualizer </h3></div>
              <div className='header-block ml-1'><Lottie animationData={scales} loop={animation} autoPlay={false} className='headerIcon'/></div>
            </MDBContainer>
          </div>
        </MDBFooter>
    </div>
  )
}

export default NavBar
