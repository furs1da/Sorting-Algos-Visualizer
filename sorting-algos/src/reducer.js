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
        return { ...state, isStarted: !state.isStarted }
    }
    if (action.type === 'GENERATE_ARRAY') {
        let itemArrayTemp = Array(Number(state.arraySize)).fill().map(() => {
            return {
                value: Math.floor(Math.random() * (state.maxArrayValue - state.minArrayValue + 1)) + state.minArrayValue,
                isSelected: false,
                isCompared: false,
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
    if(action.type === 'SWAP_ITEMS'){
        let itemArraySwap = state.itemArray;
        let temp = JSON.parse(JSON.stringify(itemArraySwap[action.index + 1]));

        itemArraySwap[action.index + 1].value = itemArraySwap[action.index].value;
        itemArraySwap[action.index].value = temp.value;
        return {...state, itemArray: itemArraySwap}
    }
}




  export default reducer;