const reducer = (state, action) => {
    if (action.type === 'LOADING') {
        console.log('state');
        return { ...state, loading: false }
    }
    if (action.type === 'COMPLETED') {
        return { ...state, completed: true }
    }
}
  
  export default reducer;