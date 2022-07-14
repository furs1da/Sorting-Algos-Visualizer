import sortingTypes from './data/sorting-types';

/**
 * reducer is a function used to work with reducer related requests in context.js to change state, 
 * but with advanced logic (useReducer React-Hook)
 */

const reducer = (state, action) => {
    // #region Loading Screen
    if (action.type === 'LOADING') {
        return { ...state, loading: false }
    }
    if (action.type === 'COMPLETED') {
        return { ...state, completed: true }
    }
    // #endregion
    // #region SortingContainer component's controls
    if (action.type === 'SPEED_CHANGE') { // to change Speed of Sorting
        return { ...state, sortingSpeed: action.speedValue }
    }
    if (action.type === 'ARRAY_SIZE_CHANGE') { // to change the Size of the Array
        return { ...state, arraySize: action.arraySizeValue }
    }
    if (action.type === 'SET_TIME_AND_SPACE_COMPLEXITY') { // to update 2 labels' values (Time and Space complexity) after Sorting Type was changed in the Select
        let sortingTypeTemp = sortingTypes.find((item) => {
            return item.sortingType === action.sortType;
        });
        return { ...state, timeComplexity: sortingTypeTemp.timeComplexity, spaceComplexity: sortingTypeTemp.spaceComplexity}
    }
    if (action.type === 'SORTING_TYPE_CHANGE') { // to change sorting type in the Select
        return { ...state, sortingType: action.sortingTypeValue }
    }
    if (action.type === 'SORTING_CONTROL') { // is used while pressing on 'Start' and 'Stop' buttons (to clear items' isFinished property in the array)
        // and change enable/disable buttons with each other (when 'Start' button is enable - 'Stop' button is disabled, and vice-versa)
        let itemArrayTempClone = state.itemArray.map((item) => {
            return {
                value: item.value,
                isInPlace: false
            }
        })
        return { ...state, isStarted: !state.isStarted, itemArray: itemArrayTempClone}
    }
    if (action.type === 'ENABLE_CONTROL') { // is used when sorting is completed and we need to make 'Stop' button disabled and 'Start' button enabled
        if(state.isStarted) {
            return { ...state, isStarted: false}
        }
        return { ...state}
    }
    if (action.type === 'GENERATE_ARRAY') { // is used when 'Generate New Array' button is clicked to randomly generate new array of values
        let itemArrayTemp = Array(Number(state.arraySize)).fill().map(() => {
            return {
                value: Math.floor(Math.random() * (state.maxArrayValue - state.minArrayValue + 1)) + state.minArrayValue,
                isInPlace: false
            }
        }) // creating new array of size of state.arraySize -> fill it with undefined values -> fill it with randomly generated values 
        // in range between minArrayValue and maxArrayValue
        // how does Math.floor(Math.random() * (state.maxArrayValue - state.minArrayValue + 1)) + state.minArrayValue work?
        // Math.random() * (state.maxArrayValue - state.minArrayValue + 1) values in range (from 0 to max-min ) are generated
        // and then + state.minArrayValue (added) to make 0 to min values to be at least min values (Min Value: 10, Generated Value: 2; then 10 + 2 = 12)
        return { ...state, itemArray: itemArrayTemp, initialArrayState: itemArrayTemp }
    }
    if (action.type === 'INITIAL_ARRAY') { // return the array to the initial state (When the Array was generated)
        let itemArrayClone = JSON.parse(JSON.stringify(state.initialArrayState));
        return { ...state, itemArray: itemArrayClone }
    }
    // #endregion
    // #region Sorting Operations
    if(action.type === 'SWAP_ITEMS_BUBBLE_SORT'){ // is used to swap item in Bubble Sort
        let itemArraySwap = state.itemArray;
        if(state.isStarted) {
            
            let temp = JSON.parse(JSON.stringify(itemArraySwap[action.index + 1])); // is used to create new item with completely new link (space) in the memory 
            itemArraySwap[action.index + 1].value = itemArraySwap[action.index].value;
            itemArraySwap[action.index].value = temp.value;
        
        }
        return {...state, itemArray: itemArraySwap}
    }
    if(action.type === 'SWAP_ITEMS'){ // is used in the majority of sorting algorithms to swap 2 items by their indexes
        let itemArraySwap = state.itemArray;
        if(state.isStarted) {
            let temp = JSON.parse(JSON.stringify(itemArraySwap[action.indexLeft]));
            itemArraySwap[action.indexLeft].value = itemArraySwap[action.indexRight].value;
            itemArraySwap[action.indexRight].value = temp.value;
        }
        return {...state, itemArray: itemArraySwap}
    }
    if(action.type === 'INSERT_ITEM_INSERTION_SORT'){ // is used in Insertion Sort (differs from INSERT_KEY_INSERTION_SORT)
        // basically simply set next item in the array same as the current one
        let itemArraySwap = state.itemArray;
        if(state.isStarted) {
            let temp = JSON.parse(JSON.stringify(itemArraySwap[action.index]));
            itemArraySwap[action.index + 1].value = temp.value;    
        }
        return {...state, itemArray: itemArraySwap}
    }
    if(action.type === 'INSERT_ITEM_SHELL_SORT'){ // is used in Shell Sort (differs from INSERT_KEY_SHELL_SORT)
        // basically simply set next item in the interval same as the current one (backwards)
        let itemArraySwap = state.itemArray; 
        if(state.isStarted) {
            let temp = JSON.parse(JSON.stringify(itemArraySwap[action.index - action.intervalVal]));
            itemArraySwap[action.index].value = temp.value;    
        }
        return {...state, itemArray: itemArraySwap}
    }
    if(action.type === 'INSERT_KEY_INSERTION_SORT'){ // is used in Insertion Sort to insert a key to needed index
        let itemArraySwap = state.itemArray;
        if(state.isStarted) {
            let temp = JSON.parse(JSON.stringify(action.keyValue));
            itemArraySwap[action.index + 1].value = temp; // index + 1, because when we find needed index we will be always 1 index behind (watch Insertion Sort method in context.js)
        }
        return {...state, itemArray: itemArraySwap}
    }
    if(action.type === 'INSERT_KEY_SHELL_SORT'){ // is used in Shell Sort to place key in the most possible front position 
        let itemArraySwap = state.itemArray;
        if(state.isStarted) {
            let temp = JSON.parse(JSON.stringify(action.keyValue));
            itemArraySwap[action.index].value = temp;    
        }
        return {...state, itemArray: itemArraySwap}
    }
    // #endregion
    // #region Animation while Sorting
    if(action.type === 'SET_IN_PLACE'){ // is used after sorting is completed to change color of each bar to another one (to enhance UI)
        let itemArraySwap = state.itemArray;
      
        itemArraySwap[action.index].isInPlace = true;

        return {...state, itemArray: itemArraySwap}
    }
    if (action.type === 'SET_CURRENT_ITEM') { // is used to change color of bar which is considered as current
        return { ...state, selectedIndex: action.index}
    }
    if (action.type === 'SET_COMPARED_ITEM') { // is used to change color of bar which is compared to the current one
        return { ...state, comparedIndex: action.index}
    }
    if (action.type === 'CLEAR_INDEXES') { // is used to clear index when sorting is completed
        return { ...state, comparedIndex: -1, selectedIndex: -1}
    }
    // #endregion
}




  export default reducer;