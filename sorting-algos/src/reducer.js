const reducer = (state, action) => {
    if (action.type === 'LOADING') {
        return { ...state, loading: false }
    }
    if (action.type === 'COMPLETED') {
        return { ...state, completed: true }
    }
    if (action.type === 'SPEED_CHANGE') {
        return { ...state, sortingSpeed: action.speedValue }
    }
    if (action.type === 'ARRAY_SIZE_CHANGE') {
        return { ...state, arraySize: action.arraySizeValue }
    }
    if (action.type === 'SORTING_TYPE_CHANGE') {
        return { ...state, sortingType: action.sortingTypeValue }
    }
    if (action.type === 'SORTING_CONTROL') {
        let itemArrayTempClone = state.itemArray.map((item) => {
            return {
                value: item.value,
                isInPlace: false
            }
        })
        return { ...state, isStarted: !state.isStarted, itemArray: itemArrayTempClone}
    }
    if (action.type === 'ENABLE_CONTROL') {
        if(state.isStarted) {
            return { ...state, isStarted: false}
        }
        return { ...state}
    }
    if (action.type === 'GENERATE_ARRAY') {
        let itemArrayTemp = Array(Number(state.arraySize)).fill().map(() => {
            return {
                value: Math.floor(Math.random() * (state.maxArrayValue - state.minArrayValue + 1)) + state.minArrayValue,
                isInPlace: false
            }
        })
        let itemArrayTempClone = JSON.parse(JSON.stringify(itemArrayTemp));
        return { ...state, itemArray: itemArrayTemp, initialArrayState: itemArrayTempClone }
    }
    if (action.type === 'INITIAL_ARRAY') {
        let itemArrayClone = JSON.parse(JSON.stringify(state.initialArrayState));
        return { ...state, itemArray: itemArrayClone }
    }
    if (action.type === 'CLEAR_ANIMATION') {
        return { ...state, animationLength: 0 }
    }
    if (action.type === 'ADD_ANIMATION_LENGTH') {
        let animationLengthCopy = state.animationLength + 1;
        return { ...state, animationLength: animationLengthCopy }
    }
    if(action.type === 'SWAP_ITEMS_BUBBLE_SORT'){
        let itemArraySwap = state.itemArray;
        if(state.isStarted) {
            
            let temp = JSON.parse(JSON.stringify(itemArraySwap[action.index + 1]));
            itemArraySwap[action.index + 1].value = itemArraySwap[action.index].value;
            itemArraySwap[action.index].value = temp.value;
        
        }
        return {...state, itemArray: itemArraySwap}
    }
    if(action.type === 'SWAP_ITEMS_SELECTION_SORT'){
        let itemArraySwap = state.itemArray;
        if(state.isStarted) {
            
            let temp = JSON.parse(JSON.stringify(itemArraySwap[action.stepIndex]));
            itemArraySwap[action.stepIndex].value = itemArraySwap[action.minIndex].value;
            itemArraySwap[action.minIndex].value = temp.value;
        
        }
        return {...state, itemArray: itemArraySwap}
    }
    if(action.type === 'INSERT_ITEM_INSERTION_SORT'){
        let itemArraySwap = state.itemArray;
        if(state.isStarted) {
            let temp = JSON.parse(JSON.stringify(itemArraySwap[action.index]));
            console.log('Inside temp: ' + temp.value)
            itemArraySwap[action.index + 1].value = temp.value;    
        }
        return {...state, itemArray: itemArraySwap}
    }
    if(action.type === 'INSERT_KEY_INSERTION_SORT'){
        let itemArraySwap = state.itemArray;
        if(state.isStarted) {
            let temp = JSON.parse(JSON.stringify(action.keyValue));
            itemArraySwap[action.index + 1].value = temp;    
        }
        return {...state, itemArray: itemArraySwap}
    }
    if(action.type === 'SET_IN_PLACE'){
        let itemArraySwap = state.itemArray;
      
        itemArraySwap[action.index].isInPlace = true;

        return {...state, itemArray: itemArraySwap}
    }
    if (action.type === 'SET_CURRENT_ITEM') {
        return { ...state, selectedIndex: action.index}
    }
    if (action.type === 'SET_COMPARED_ITEM') {
        return { ...state, comparedIndex: action.index}
    }
    if (action.type === 'CLEAR_INDEXES') {
        return { ...state, comparedIndex: -1, selectedIndex: -1}
    }
}




  export default reducer;