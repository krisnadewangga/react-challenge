const initialState = {
    people: []
  }
  
  const swapiReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_PEOPLE":
        return { ...state, people: action.result }
      default:
        return state
    }
  }
  
  export default swapiReducer
  