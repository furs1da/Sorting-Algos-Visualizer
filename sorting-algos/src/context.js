import React, { useState, useContext, useEffect, useReducer, useCallback, useRef } from 'react'
import reducer from './reducer'
import Queue from './utilities/queue';

const AppContext = React.createContext();

const initialState = {
    loading: true,
    completed: false,
    arraySize: 8,
    sortingSpeed: 1000,
    sortingType: 'BUBBLE_SORT',
    isStarted: false,
    itemArray: [],
    initialArrayState: [],
    minArrayValue: 10,
    maxArrayValue: 55,
    selectedIndex: -1,
    comparedIndex: -1,
    animationLength: 1
  }


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const isStartedReference = useRef()
    isStartedReference.current = state.isStarted;

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
                dispatch({type: 'SPEED_CHANGE', speedValue: 2200});
                break;
            case '2':
                dispatch({type: 'SPEED_CHANGE', speedValue: 1700});
                break;
            case '3':
                dispatch({type: 'SPEED_CHANGE', speedValue: 1200});
                break;
            case '4':
                dispatch({type: 'SPEED_CHANGE', speedValue: 800});
                break;
            case '5':
                dispatch({type: 'SPEED_CHANGE', speedValue: 200}); 
                break;
            default:
                dispatch({type: 'SPEED_CHANGE', speedValue: 700});
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
        dispatch({type: 'SORTING_CONTROL'});
        dispatch({type: 'ENABLE_CONTROL'});
        dispatch({type: 'SET_CURRENT_ITEM', index: -1})
        dispatch({type: 'SET_COMPARED_ITEM', index: -1})
        dispatch({type: 'GENERATE_ARRAY'});
    }

    const returnToInitialState = () => {
        dispatch({type: 'SORTING_CONTROL'});
        dispatch({type: 'ENABLE_CONTROL'});
        dispatch({type: 'SET_CURRENT_ITEM', index: -1})
        dispatch({type: 'SET_COMPARED_ITEM', index: -1})
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
    
    const delayClear = () => new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)  
    });


    useEffect(() => {
        if(state.isStarted){
            sortData();
        }    
    }, [state.isStarted]);

    const sortData = async () => {
        if(state.isStarted) {
            let write = 0;            
            while(write < state.itemArray.length) {  
                for(let i = 0; i < state.itemArray.length - 1; i++) {
                  if(!isStartedReference.current) {
                        return;
                  }
                  
                  if(state.itemArray[i].value > state.itemArray[i+1].value){
                    dispatch({type: 'SET_CURRENT_ITEM', index: i+1})
                    dispatch({type: 'SET_COMPARED_ITEM', index: i})
                    dispatch({type: 'SWAP_ITEMS', index: i})
                    
                    let result = await delay(state.sortingSpeed);
                  }
                  else {
                    dispatch({type: 'SET_CURRENT_ITEM', index: i})
                    dispatch({type: 'SET_COMPARED_ITEM', index: i + 1})
                  }
                  await delayClear()
                }
                write++;
            }
            
            dispatch({type: 'SET_CURRENT_ITEM', index: -1})
            dispatch({type: 'SET_COMPARED_ITEM', index: -1})
            
            for(let i = 0; i < state.itemArray.length;i++) {
                if(!isStartedReference.current) {
                    return;
                  }
                  dispatch({type: 'SET_IN_PLACE', index: i})
                  let result = await delay(300);
              }
            dispatch({type: 'ENABLE_CONTROL'});
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
