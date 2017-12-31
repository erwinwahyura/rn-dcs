const initialState = {
    data: {
      results: {} 
    }
  }
  
  const customerReducers = (state=initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_DATA_COSTUMER':
          return { ...state, data: action.payload.data }
      default:
      return state
    }
  }
  
  export default customerReducers