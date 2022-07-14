import React, { useContext, useEffect, useReducer, useRef } from 'react'
import reducer from './reducer'
/**
 * App Context of the application
 */

const AppContext = React.createContext();

const initialState = {
    loading: true, // used in Loading
    completed: false, // used in Loading
    arraySize: 8, // used in Generating Array in SortingContainer
    sortingSpeed: 700, // used in regulating sorting speed in SortingContainer
    sortingType: 'BUBBLE_SORT', // used in selecting sorting type in select in SortingContainer
    isStarted: false, // used in controling sorting proccess with buttons 'Start' and 'Stop' in SortingContainer
    itemArray: [], // container of values in SortingContainer
    initialArrayState: [], // container of values after Array was generated (used to return itemArray to Initial State, button 'Initial State') in SortingContainer
    minArrayValue: 10, // min value in itemArray
    maxArrayValue: 55, // max value in itemArray
    selectedIndex: -1, // used for changing colors while sorting for better visualisation (current item)
    comparedIndex: -1, // used for changing colors while sorting for better visualisation (compared item)
    timeComplexity: '', // used for display of time complexity of selected sorting type
    spaceComplexity: '' // used for display of space complexity of selected sorting type
  }


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const isStartedReference = useRef() // this property is used by isStarted property of the state
    isStartedReference.current = state.isStarted; // why?
    // to access isStarted property of state accross different threads (this useRef is crucial, because while working with async/await 
    // we can access only to a so-called freezed set of properties in certain function, but using useRef React Hook can help us to access 
    // real-time value of isStarted property 

    // #region Loading Screen
    const showLoadingScreen = () => {
        dispatch({type: 'LOADING'});
    }
    const showLoadingCompletedScreen = () => {
        dispatch({type: 'COMPLETED'});
    }
    //#endregion
    //#region Controls
    const controlSorting = () => { // is used when 'Start' or 'Stop' button is pressed
        dispatch({type: 'SORTING_CONTROL'});
    }

    const changeSortingSpeed = (value) => { // is used when we change sorting speed in slider in SortingContainer
        switch(value) {
            case '1':
                dispatch({type: 'SPEED_CHANGE', speedValue: 2000});
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

    const changeArraySize = (value) => { // is used when we change array size in slider in SortingContainer
        dispatch({type: 'ARRAY_SIZE_CHANGE', arraySizeValue: value});
    }

    const changeSortingType = (value) => { // is used when we change sorting type in select in SortingContainer
        dispatch({type: 'SORTING_TYPE_CHANGE', sortingTypeValue: value});
        dispatch({type: 'SET_TIME_AND_SPACE_COMPLEXITY', sortType: value});
    }

    const generateNewItemArray = () => { // is used whe we are pressing 'Generate New Array' button in SortingContainer
        dispatch({type: 'SORTING_CONTROL'}); 
        dispatch({type: 'ENABLE_CONTROL'});
        dispatch({type: 'CLEAR_INDEXES'})
        dispatch({type: 'GENERATE_ARRAY'});
    }

    const returnToInitialState = () => { // is used whe we are pressing 'Initial State' button in SortingContainer
        dispatch({type: 'SORTING_CONTROL'});
        dispatch({type: 'ENABLE_CONTROL'});
        dispatch({type: 'CLEAR_INDEXES'})
        dispatch({type: 'INITIAL_ARRAY'});
    }
    // #endregion

    useEffect(() => { // is used for animation and generating array of value when user only loads the page
        const timer = setTimeout( () => {
            showLoadingScreen(); // showing loading animation
            dispatch({type: 'GENERATE_ARRAY'}); //generating array of values
            setTimeout(() => {
                showLoadingCompletedScreen();  // showing success text after loading is completed
            }, 1500);
        }, 2250)
        dispatch({type: 'SET_TIME_AND_SPACE_COMPLEXITY', sortType: state.sortingType}); // set time and space complexity of 
        return () => clearTimeout(timer);
    }, []);

    const delay = t => new Promise(resolve => setTimeout(resolve, t)); //is used to regulate sorting speed (swapping)
    
    const delayClear = () => new Promise(resolve => { // is used to regulate sorting speed (comparing)
        setTimeout(() => {
            resolve()
        }, state.sortingSpeed / 2 > 500 ? 500 : state.sortingSpeed / 2) 
    });


    useEffect(() => { 
        if(state.isStarted){
            switch(state.sortingType) {
                case 'BUBBLE_SORT':
                    bubbleSortData();
                    break;
                case 'MERGE_SORT':
                    let array = JSON.parse(JSON.stringify(state.itemArray)); // here I made copy of the itemArray because of complex logic of animation in Merge Sort
                    mergeSortDataVisual(array); // I had to animate Merge Sort with an existing set of values (and in Merge Sort we are diving array up to 1 element in each subarray)
                    break; // so I had to create copy of the itemArray and figure out how to animate everything smoothly (which I have done with additional pointer)
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
                case 'HEAP_SORT':
                    heapSort();
                    break;        
                default:
                    bubbleSortData();
                    break;
              }
              
        }    
    }, [state.isStarted]);

      // #region Bubble Sort
    const bubbleSortData = async () => { //simple bubble sort logic 
        if(state.isStarted) { // where in each iteration the highest value goes to the end of the array
            let write = 0;            
            while(write < state.itemArray.length) {  
                for(let i = 0; i < state.itemArray.length - write - 1; i++) {
                  if(!isStartedReference.current) {
                        return;
                  }
                  dispatch({type: 'SET_CURRENT_ITEM', index: i})
                  dispatch({type: 'SET_COMPARED_ITEM', index: i + 1})
                  await delayClear()
                  if(!isStartedReference.current) {
                    return;
                  }
                  if(state.itemArray[i].value > state.itemArray[i+1].value){
                    dispatch({type: 'SWAP_ITEMS_BUBBLE_SORT', index: i})
                    await delay(state.sortingSpeed);
                  }
                }
                write++;
            }
            endSorting();
        }
      }
      // #endregion

      // #region Shell Sort
      const shellSortData = async () => { // simple shell sort logic where insertion sort is used but with intervals what reduces Time Complexity 
        if(state.isStarted) { // we are taking value at certain index and store it in a key variable and then just compare and swap proccess
            // process is identical to insertion sort (selection sort is similar to it as well and easier to understand, so I recommend to check Selection Sort algorithms to understand everything better)
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
                        
                        dispatch({type: 'INSERT_ITEM_SHELL_SORT', index: j, intervalVal: interval})
                        await delay(state.sortingSpeed);
                    }
                    if(!isStartedReference.current) {
                        return;
                    }
                    dispatch({type: 'INSERT_KEY_SHELL_SORT', keyValue: temp, index: j})
                    await delayClear(); 
                }
            }
            endSorting();
        }
      }
      // #endregion
      // #region Selection Sort
      const selectionSortData = async () => { // simple selection sort algorithm logic, extremely similar to bubble sort
        if(state.isStarted) { // but is done vice-versa, in each iteration the lowest element goes to the start of the array
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
                if(!isStartedReference.current) {
                    return;
                }
                dispatch({type: 'SWAP_ITEMS', indexLeft: step, indexRight: min_index})
                await delay(state.sortingSpeed);
              }
            endSorting();
        }
      }
      // #endregion
      
      // #region Insertion Sort
      const insertionSortData = async () => { // standart logic of Insertion Sort algorithm
        if(state.isStarted) { // in every iterion of this algorithm we have sorted array behind current index
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
                if(!isStartedReference.current) {
                    return;
                }
                dispatch({type: 'INSERT_KEY_INSERTION_SORT', keyValue: key, index: i})
                await delay(state.sortingSpeed);
              }

            endSorting();
        }
      }
      // #endregion
      
      // #region Merge Sort
      const mergeSortDataVisual = async (arr) => { // standart logic of Merge Sort, but is performed with 2 array (1 is going through sorting logic,
        if(state.isStarted) { // 1 is displaying sorting animation) I accomplished this task by adding startingIndex
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
            // below there are 3 ifs to avoid all possible edge cases
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
                    dispatch({type: 'SWAP_ITEMS', indexLeft: startingIndex, indexRight: indexLeftByValue})
                    sortedArr.push(left.shift());
                }
                else {
                    dispatch({type: 'SET_CURRENT_ITEM', index: startingIndex})
                    dispatch({type: 'SET_COMPARED_ITEM', index: indexRightByValue})
                    dispatch({type: 'SWAP_ITEMS', indexLeft: startingIndex, indexRight: indexRightByValue})
                    sortedArr.push(right.shift());
                }
                startingIndex++;
                await delay(state.sortingSpeed);
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
                dispatch({type: 'SWAP_ITEMS', indexLeft: startingIndex, indexRight: indexLeftByValue})
                sortedArr.push(left.shift());
                startingIndex++;
                await delay(state.sortingSpeed);
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
                dispatch({type: 'SWAP_ITEMS', indexLeft: startingIndex, indexRight: indexRightByValue})
                sortedArr.push(right.shift());
                startingIndex++;
                await delay(state.sortingSpeed);
            }
           
            return [...sortedArr];
        }
      }
     // #endregion
     
     // #region Quick Sort
     const quickSortDataVisual = async () => { // Standart logic of Quick Sort
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
                    dispatch({type: 'SWAP_ITEMS', indexLeft: i, indexRight: j})
                    i++;
                    j--;
                   await delay(state.sortingSpeed);
                }
            }           
            return i; 
        }
      }

     // #endregion
     
     // #region Heap Sort 
      const heapSort = async () => { // Standart logic of Heap Sort
        for (let i = Math.floor(state.itemArray.length / 2); i >= 0; i--) {
            if(!isStartedReference.current) {
                return;
            }
            await maxHeapify(state.itemArray.length, i); 
        }
     
        // One by one extract an element from heap 
        for (let i = state.itemArray.length - 1; i >= 0; i--) { 
            // Move current root to end
            if(!isStartedReference.current) {
             return;
            } 
            dispatch({type: 'SET_CURRENT_ITEM', index: 0})
            dispatch({type: 'SET_COMPARED_ITEM', index: i})
            dispatch({type: 'SWAP_ITEMS', indexLeft: 0, indexRight: i})
 
            await delayClear();
            // call max heapify on the reduced heap 
            await maxHeapify(i, 0); 
        }
        
        endSorting(); 
      }

      const maxHeapify = async (n, i) => {
        if(!isStartedReference.current) {
            return;
        }
        let largest = i;
        let l = 2 * i + 1; //left child index
        let r = 2 * i + 2; //right child index
        
        //If left child is smaller than root
         if (l < n && state.itemArray[l].value > state.itemArray[largest].value) {
               largest = l; 
         }
        
         // If right child is smaller than smallest so far 
         if (r < n && state.itemArray[r].value > state.itemArray[largest].value) {
              largest = r; 
         }
        
         // If smallest is not root 
         if (largest !== i) { 
            if(!isStartedReference.current) {
                return;
            }  
              dispatch({type: 'SET_CURRENT_ITEM', index: i})
              dispatch({type: 'SET_COMPARED_ITEM', index: largest})
              dispatch({type: 'SWAP_ITEMS', indexLeft: i, indexRight: largest})

              await delay(state.sortingSpeed);
            // Recursively heapify the affected sub-tree 
            await maxHeapify(n, largest); 
          } 
      }
     // #endregion

     // #region End Sort Animation

      const endSorting = async () => { // is used when sorting is completed to change bars' colors
        dispatch({type: 'CLEAR_INDEXES'})
            
        for(let i = 0; i < state.itemArray.length;i++) {
            if(!isStartedReference.current) {
                return;
              }
              dispatch({type: 'SET_IN_PLACE', index: i})
              await delayClear();
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
