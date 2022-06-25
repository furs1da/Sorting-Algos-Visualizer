import React, { useState, useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'

const AppContext = React.createContext();

const initialState = {
    loading: true,
    completed: false,
    arraySize: 10,
    sortingSpeed: 1000,
    sortingType: 'BUBBLE_SORT',

  }


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const showLoadingScreen = () => {
        dispatch({type: 'LOADING'});
    }
    const showLoadingCompletedScreen = () => {
        dispatch({type: 'COMPLETED'});
    }

    const changeSortingSpeed = (value) => {
        console.log(value);
        switch(value) {
            case '1':
                dispatch({type: 'SPEED_CHANGE', speedValue: 3500});
            case '2':
                dispatch({type: 'SPEED_CHANGE', speedValue: 2800});
            case '3':
                dispatch({type: 'SPEED_CHANGE', speedValue: 2100});
            case '4':
                dispatch({type: 'SPEED_CHANGE', speedValue: 1400});
            case '5':
                dispatch({type: 'SPEED_CHANGE', speedValue: 500}); 
            default:
                dispatch({type: 'SPEED_CHANGE', speedValue: 1000});
          }
    }

    useEffect(() => {
        const timer = setTimeout( () => {
            showLoadingScreen();
            console.log(state);
            setTimeout(() => {
                showLoadingCompletedScreen();  
            }, 1500);
        }, 2250)
        return () => clearTimeout(timer);
    }, []);
    

    return (
        <AppContext.Provider
        value = {{
            ...state,
            
        }}
        >
           {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
  }
  
export { AppContext, AppProvider }
