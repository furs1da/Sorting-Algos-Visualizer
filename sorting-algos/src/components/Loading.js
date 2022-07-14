import React from 'react'
import { useGlobalContext } from '../context'

import Lottie from "lottie-react";

import * as success from "../lotties/57490-successful.json";
import * as loadingBar from "../lotties/99274-loading.json";

/**
 * Loading compenent is used to display Loading screen to the User while data is generating. 
 * loading and completed are properties of globalContext (context.js) which are used to control animation and display of the Loading screen
 * While loading 2 Lotties (animated files, success and loadingBar) will be displayed
 * In the beginning, you will see loadingBar animation and then success animation
 * loading property of globalContext is used to control and switch loadindBar and success animations
 * completed property of globalContext is used to control display of Loading component (when Loading is completed -> show Main Page, watch App.js)
 */


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