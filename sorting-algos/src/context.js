import React, { useState, useContext, useEffect, useReducer, useCallback } from 'react'
import reducer from './reducer'
import Queue from './utilities/queue';

const AppContext = React.createContext();

const initialState = {
    loading: true,
    completed: false,
    arraySize: 3,
    sortingSpeed: 1000,
    sortingType: 'BUBBLE_SORT',
    isStarted: false,
    itemArray: [],
    initialArrayState: [],
    minArrayValue: 10,
    maxArrayValue: 55,
    animationLength: 1
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

    const delay = t => new Promise(resolve => setTimeout(resolve, t));

    useEffect(() => {
        sortData();
    }, [state.isStarted]);

    const sortData = async () => {
        if(state.isStarted) {
            let write = 0;            
            while(write < state.itemArray.length) {
                
                for(let i = 0; i < state.itemArray.length - 1;i++) {
                  if(state.itemArray[i].value > state.itemArray[i+1].value){
                    dispatch({type: 'SWAP_ITEMS', index: i})
                    let result = await delay(state.sortingSpeed);
                  }
                }
                write++;
            }
            dispatch({type: 'SORTING_CONTROL'});
        }
      }

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
