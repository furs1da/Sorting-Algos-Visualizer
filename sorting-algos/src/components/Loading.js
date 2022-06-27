import React, { useState, useContext, useReducer, useEffect } from 'react'
import { useGlobalContext } from '../context'

import Lottie from "lottie-react";

import * as success from "../lotties/57490-successful.json";
import * as loadingBar from "../lotties/99274-loading.json";



const Loading = () => {
  const {loading, completed} = useGlobalContext();

  return (
    <div className='containerLoading'>
      {!completed ? (
        <>
          {loading ? (
            <div>
            <Lottie animationData={loadingBar} className='loadingIcon' />
            <h3 className='loadingText'>Loading data...</h3>
            </div>
          ) : (
            <div>
            <Lottie animationData={success} className='loadingIcon' />
            <h3 className='completedText'>S u c c e s s !</h3>
            </div>
          )}
        </>
      ) : (
        <>
        </>
      )}
    </div>
 )
}

export default Loading