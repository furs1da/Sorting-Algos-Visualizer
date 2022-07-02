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
                dispatch({type: 'SPEED_CHANGE', speedValue: 1500});
                break;
            case '2':
                dispatch({type: 'SPEED_CHANGE', speedValue: 1000});
                break;
            case '3':
                dispatch({type: 'SPEED_CHANGE', speedValue: 500});
                break;
            case '4':
                dispatch({type: 'SPEED_CHANGE', speedValue: 300});
                break;
            case '5':
                dispatch({type: 'SPEED_CHANGE', speedValue: 100}); 
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
        dispatch({type: 'SORTING_CONTROL'});
        dispatch({type: 'ENABLE_CONTROL'});
        dispatch({type: 'CLEAR_INDEXES'})
        dispatch({type: 'GENERATE_ARRAY'});
    }

    const returnToInitialState = () => {
        dispatch({type: 'SORTING_CONTROL'});
        dispatch({type: 'ENABLE_CONTROL'});
        dispatch({type: 'CLEAR_INDEXES'})
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
        }, 500)  
    });


    useEffect(() => {
        if(state.isStarted){
            switch(state.sortingType) {
                case 'BUBBLE_SORT':
                    bubbleSortData();
                    break;
                case 'MERGE_SORT':
                    let array = JSON.parse(JSON.stringify(state.itemArray));
                    mergeSortDataVisual(array);
                    break;
                case 'INSERTION_SORT':
                    insertionSortData();
                    break;
                case 'SELECTION_SORT':
                    selectionSortData();
                    break;             
                default:
                    bubbleSortData();
                    break;
              }
              
        }    
    }, [state.isStarted]);

    const bubbleSortData = async () => {
        if(state.isStarted) {
            let write = 0;            
            while(write < state.itemArray.length) {  
                for(let i = 0; i < state.itemArray.length - write - 1; i++) {
                  if(!isStartedReference.current) {
                        return;
                  }
                  dispatch({type: 'SET_CURRENT_ITEM', index: i})
                  dispatch({type: 'SET_COMPARED_ITEM', index: i + 1})
                  await delayClear()
                  if(state.itemArray[i].value > state.itemArray[i+1].value){
                    dispatch({type: 'SWAP_ITEMS_BUBBLE_SORT', index: i})
                    let result = await delay(state.sortingSpeed);
                  }
                }
                write++;
            }
            endSorting();
        }
      }

      const selectionSortData = async () => {
        if(state.isStarted) {
            for(let step = 0; step < state.itemArray.length - 1; step++) {
                let min_index = step;

                for(let i = step + 1; i < state.itemArray.length; i++) {
                    if(!isStartedReference.current) {
                        return;
                  }
                  if(state.itemArray[i].value < state.itemArray[min_index].value) {
                    min_index = i;
                  }
                  dispatch({type: 'SET_CURRENT_ITEM', index: step})
                  dispatch({type: 'SET_COMPARED_ITEM', index: i})
                  await delayClear()
                }
                dispatch({type: 'SET_CURRENT_ITEM', index: step})
                dispatch({type: 'SET_COMPARED_ITEM', index: min_index})
                dispatch({type: 'SWAP_ITEMS_SELECTION_SORT', stepIndex: step, minIndex: min_index})
                let result = await delay(state.sortingSpeed);
              }
            endSorting();
        }
      }

      const insertionSortData = async () => {
        if(state.isStarted) {
            for(let step = 1; step < state.itemArray.length; step++) {
                let key = state.itemArray[step].value;
                let i = step - 1;



                while(i >= 0 && key < state.itemArray[i].value){
                    if(!isStartedReference.current) {
                        return;
                    }
                    dispatch({type: 'SET_CURRENT_ITEM', index: i})
                    dispatch({type: 'SET_COMPARED_ITEM', index: i+1})
                    dispatch({type: 'INSERT_ITEM_INSERTION_SORT', index: i})
                    --i;
                    await delayClear()
                }
                dispatch({type: 'CLEAR_INDEXES'})
                dispatch({type: 'SET_CURRENT_ITEM', index: i + 1})
                
                dispatch({type: 'INSERT_KEY_INSERTION_SORT', keyValue: key, index: i})
                let result = await delay(state.sortingSpeed);
              }

            endSorting();
        }
      }
      const mergeSortDataVisual = async (arr) => {
        if(state.isStarted) {
            await mergeSortData(arr);
            endSorting();
        }
      }
      const mergeSortData = async (arr) => {
        if(state.isStarted) {
            
            const half = Math.floor(arr.length / 2);

            if(arr.length <= 1)
                return arr;
            
            const left = arr.splice(0, half);
            const right = arr;
            return await mergeData(await mergeSortData(left), await mergeSortData(right));
            
        }
      }

      const mergeData = async (left, right) => {
        if(state.isStarted) {
            let sortedArr = [];
            let startingIndex = state.itemArray.findIndex( (item) => {
                return item.value === left[0].value;
            })
            while(left.length && right.length) {
                let indexLeftByValue = state.itemArray.findIndex( (item) => {
                    return item.value === left[0].value;
                })
                let indexRightByValue = state.itemArray.findIndex( (item) => {
                    return item.value === right[0].value;
                })
                

                if(left[0].value < right[0].value) {
                    dispatch({type: 'SET_CURRENT_ITEM', index: startingIndex})
                    dispatch({type: 'SET_COMPARED_ITEM', index: indexLeftByValue})
                    dispatch({type: 'SWAP_ITEMS_MERGE_SORT', indexLeft: startingIndex, indexRight: indexLeftByValue})
                    sortedArr.push(left.shift());
                }
                else {
                    dispatch({type: 'SET_CURRENT_ITEM', index: startingIndex})
                    dispatch({type: 'SET_COMPARED_ITEM', index: indexRightByValue})
                    dispatch({type: 'SWAP_ITEMS_MERGE_SORT', indexLeft: startingIndex, indexRight: indexRightByValue})
                    sortedArr.push(right.shift());
                }
                startingIndex++;
                let result = await delay(1000);
            }
            while(left.length) {
                let indexLeftByValue = state.itemArray.findIndex( (item) => {
                    return item.value === left[0].value;
                })
                dispatch({type: 'SET_CURRENT_ITEM', index: startingIndex})
                dispatch({type: 'SET_COMPARED_ITEM', index: indexLeftByValue})
                dispatch({type: 'SWAP_ITEMS_MERGE_SORT', indexLeft: startingIndex, indexRight: indexLeftByValue})
                sortedArr.push(left.shift());
                let result = await delay(1000);
                startingIndex++;
            }
            while(right.length) {
                let indexRightByValue = state.itemArray.findIndex( (item) => {
                    return item.value === right[0].value;
                })
                dispatch({type: 'SET_CURRENT_ITEM', index: startingIndex})
                dispatch({type: 'SET_COMPARED_ITEM', index: indexRightByValue})
                dispatch({type: 'SWAP_ITEMS_MERGE_SORT', indexLeft: startingIndex, indexRight: indexRightByValue})
                sortedArr.push(right.shift());
                let result = await delay(1000);
                startingIndex++;
            }
            
            return [...sortedArr, ...left, ...right];
        }
      }

      const endSorting = async () => {
        dispatch({type: 'CLEAR_INDEXES'})
            
        for(let i = 0; i < state.itemArray.length;i++) {
            if(!isStartedReference.current) {
                return;
              }
              dispatch({type: 'SET_IN_PLACE', index: i})
              let result = await delay(300);
          }
        dispatch({type: 'ENABLE_CONTROL'});
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
