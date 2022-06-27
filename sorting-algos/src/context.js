import React, { useState, useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'

const AppContext = React.createContext();

const initialState = {
    loading: true,
    completed: false,
    arraySize: 10,
    sortingSpeed: 1000,
    sortingType: 'BUBBLE_SORT',
    isStarted: false,
    itemArray: [],
    initialArrayState: [],
    minArrayValue: 10,
    maxArrayValue: 55
  }


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const showLoadingScreen = () => {
        dispatch({type: 'LOADING'});
    }
    const showLoadingCompletedScreen = () => {
        dispatch({type: 'COMPLETED'});
    }

    const controlSorting = () => {
        dispatch({type: 'SORTING_CONTROL'});
    }

    const changeSortingSpeed = (value) => {
        switch(value) {
            case '1':
                dispatch({type: 'SPEED_CHANGE', speedValue: 3500});
                break;
            case '2':
                dispatch({type: 'SPEED_CHANGE', speedValue: 2800});
                break;
            case '3':
                dispatch({type: 'SPEED_CHANGE', speedValue: 2100});
                break;
            case '4':
                dispatch({type: 'SPEED_CHANGE', speedValue: 1400});
                break;
            case '5':
                dispatch({type: 'SPEED_CHANGE', speedValue: 500}); 
                break;
            default:
                dispatch({type: 'SPEED_CHANGE', speedValue: 1000});
                break;
          }
    }

    const changeArraySize = (value) => {
        dispatch({type: 'ARRAY_SIZE_CHANGE', arraySizeValue: value});
    }

    const changeSortingType = (value) => {
        dispatch({type: 'SORTING_TYPE_CHANGE', sortingTypeValue: value});
    }

    const generateNewItemArray = () => {
        dispatch({type: 'GENERATE_ARRAY'});
    }

    const returnToInitialState = () => {
        dispatch({type: 'INITIAL_ARRAY'});
    }

    useEffect(() => {
        const timer = setTimeout( () => {
            showLoadingScreen();
            dispatch({type: 'GENERATE_ARRAY'});
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
            changeSortingSpeed,
            changeArraySize,
            changeSortingType,
            controlSorting,
            generateNewItemArray,
            returnToInitialState
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
