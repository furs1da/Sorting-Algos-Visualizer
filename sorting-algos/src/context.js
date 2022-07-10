import React, { useState, useContext, useEffect, useReducer, useCallback, useRef } from 'react'
import reducer from './reducer'
import Queue from './utilities/queue';

const AppContext = React.createContext();

const initialState = {
    loading: true,
    completed: false,
    arraySize: 20,
    sortingSpeed: 100,
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
                dispatch({type: 'SPEED_CHANGE', speedValue: 3000});
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
                case 'SHELL_SORT':
                    shellSortData();
                    break;
                case 'QUICK_SORT':
                    quickSortDataVisual();
                    break;        
                default:
                    bubbleSortData();
                    break;
              }
              
        }    
    }, [state.isStarted]);

      // #region Bubble Sort
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
      // #endregion

      // #region Shell Sort
      const shellSortData = async () => {
        if(state.isStarted) {
            for(let interval = Math.floor(state.itemArray.length / 2); interval > 0; interval = Math.floor(interval/2)) {
                for(let i = interval; i < state.itemArray.length; i++){
                    if(!isStartedReference.current) {
                        return;
                    }
                    let temp = state.itemArray[i].value;
                    let j = i;
                    dispatch({type: 'SET_CURRENT_ITEM', index: j})
                    dispatch({type: 'SET_COMPARED_ITEM', index: j-interval})
                    for(j = i; j >= interval && state.itemArray[j - interval].value > temp; j -= interval) {
                        if(!isStartedReference.current) {
                            return;
                        }
                        dispatch({type: 'SET_CURRENT_ITEM', index: j})
                        dispatch({type: 'SET_COMPARED_ITEM', index: j-interval})
                        
                        dispatch({type: 'SWAP_ITEMS_MERGE_SORT', indexLeft: j, indexRight: j-interval})
                        let result = await delay(state.sortingSpeed);
                    }
                    
                    dispatch({type: 'INSERT_KEY_SHELL_SORT', keyValue: temp, index: j})
                    let result = await delayClear(); 
                }
            }
            endSorting();
        }
      }
      // #endregion
      // #region Selection Sort
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
      // #endregion
      
      // #region Insertion Sort
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
      // #endregion
      
      // #region Merge Sort
      const mergeSortDataVisual = async (arr) => {
        if(state.isStarted) {
            if(!isStartedReference.current) {
                return;
            }
            await mergeSortData(arr);
            if(!isStartedReference.current) {
                return;
            }
            endSorting();
        }
      }
      const mergeSortData = async (arr) => {
        if(state.isStarted) {
            if(!isStartedReference.current) {
                return;
            }
            let half = Math.floor(arr.length / 2 - 1);

            if(arr.length <= 1)
                return arr;
            if(half < 1) {
                half += 1;
            }

            const left = arr.splice(0, half);
            const right = arr;
            return await mergeData(await mergeSortData(left), await mergeSortData(right));
            
        }
      }

      const mergeData = async (left, right) => {
        if(state.isStarted) {
            let sortedArr = [];
            let startingIndex = 0;
            if(left !== undefined){
                startingIndex = state.itemArray.findIndex( (item) => {
                    return item.value === left[0].value;
                })
            }
            if(right !== undefined){
                startingIndex = state.itemArray.findIndex( (item) => {
                    return item.value === right[0].value;
                })
            }
            if(left.length !== 0 && right.length !== 0) {
                
                let leftIndex = state.itemArray.findIndex( (item) => {
                    return item.value === left[0].value;
                })
               
                let rightIndex = state.itemArray.findIndex( (item) => {
                        return item.value === right[0].value;
                    })
                
                startingIndex = leftIndex < rightIndex ? leftIndex : rightIndex; 
            }
            while(left !== undefined && left.length !== 0 && right !== undefined && right.length !== 0) {
                if(!isStartedReference.current) {
                    return;
                }
                let indexLeftByValue = state.itemArray.findIndex( (item, index) => {
                    return item.value === left[0].value && index >= startingIndex;
                })
                let indexRightByValue = state.itemArray.findIndex( (item, index) => {
                    return item.value === right[0].value && index >= startingIndex;
                })
                

                if(left[0].value <= right[0].value) {
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
                let result = await delay(state.sortingSpeed);
            }
            
            
            while(left !== undefined && left.length !== 0) {
                if(!isStartedReference.current) {
                    return;
                }
                let indexLeftByValue = state.itemArray.findIndex( (item) => {
                    return item.value === left[0].value;
                })
                dispatch({type: 'SET_CURRENT_ITEM', index: startingIndex})
                dispatch({type: 'SET_COMPARED_ITEM', index: indexLeftByValue})
                dispatch({type: 'SWAP_ITEMS_MERGE_SORT', indexLeft: startingIndex, indexRight: indexLeftByValue})
                sortedArr.push(left.shift());
                startingIndex++;
                let result = await delay(state.sortingSpeed);
            }
            while(right !== undefined && right.length !== 0) {
                if(!isStartedReference.current) {
                    return;
                }
                let indexRightByValue = state.itemArray.findIndex( (item) => {
                    return item.value === right[0].value;
                })
                dispatch({type: 'SET_CURRENT_ITEM', index: startingIndex})
                dispatch({type: 'SET_COMPARED_ITEM', index: indexRightByValue})
                dispatch({type: 'SWAP_ITEMS_MERGE_SORT', indexLeft: startingIndex, indexRight: indexRightByValue})
                sortedArr.push(right.shift());
                startingIndex++;
                let result = await delay(state.sortingSpeed);
            }
           
            return [...sortedArr];
        }
      }
     // #endregion
     
     // #region Quick Sort
     const quickSortDataVisual = async () => {
        if(state.isStarted) {
            if(!isStartedReference.current) {
                return;
            }
            await quickSortData(0, state.itemArray.length - 1);
            if(!isStartedReference.current) {
                return;
            }
            endSorting();
        }
      }
      const quickSortData = async (left, right) => {
        if(state.isStarted) {
            if(!isStartedReference.current) {
                return;
            }
           
            let pivot = await partitionData(left, right);
      
            if(left < pivot - 1) {
                await quickSortData(left, pivot - 1);
            }
            if(pivot < right) {
                await quickSortData(pivot, right);
            }
            if(!isStartedReference.current) {
                return;
            }
            
        }
      }

      const partitionData = async (left, right) => {
        if(state.isStarted) {
            if(!isStartedReference.current) {
                return;
            }
            let pivot = state.itemArray[Math.floor((right+left)/2)].value;
            let i = left;
            let j = right;
            while(i <= j) {
                while(state.itemArray[i].value < pivot) {
                    if(!isStartedReference.current) {
                        return;
                    }
                    dispatch({type: 'SET_CURRENT_ITEM', index: Math.floor((right+left)/2)})
                    dispatch({type: 'SET_COMPARED_ITEM', index: i})
                    i++;
                    await delayClear();
                }
                while(state.itemArray[j].value > pivot) {
                    if(!isStartedReference.current) {
                        return;
                    }
                    dispatch({type: 'SET_CURRENT_ITEM', index: Math.floor((right+left)/2)})
                    dispatch({type: 'SET_COMPARED_ITEM', index: j})
                    j--;
                    await delayClear();
                }
                if(i <= j) {
                    if(!isStartedReference.current) {
                        return;
                    }
                    dispatch({type: 'SET_CURRENT_ITEM', index: i})
                    dispatch({type: 'SET_COMPARED_ITEM', index: j})
                    dispatch({type: 'SWAP_ITEMS_MERGE_SORT', indexLeft: i, indexRight: j})
                    i++;
                    j--;
                    let result = await delay(state.sortingSpeed);
                }
            }           
            return i; 
        }
      }

     // #endregion
     
     // #region Heap Sort 
     const heapSort = async () => {
        
      }
     // #endregion

     // #region End Sort Animation

      const endSorting = async () => {
        dispatch({type: 'CLEAR_INDEXES'})
            
        for(let i = 0; i < state.itemArray.length;i++) {
            if(!isStartedReference.current) {
                return;
              }
              dispatch({type: 'SET_IN_PLACE', index: i})
              let result = await delay(state.sortingSpeed / 2);
          }
        dispatch({type: 'ENABLE_CONTROL'});
      }
     // #endregion  
    
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
