const generateItemArray = (length = 3, min = 5, max = 55) => {
    return 
}


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
        return { ...state, itemArray: itemArrayTemp, initialArrayState: itemArrayTemp }
    }
    if (action.type === 'INITIAL_ARRAY') {
        return { ...state, itemArray: state.initialArrayState }
    }
}




  export default reducer;