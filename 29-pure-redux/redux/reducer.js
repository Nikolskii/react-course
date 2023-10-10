import * as a from "./actionTypes.js";

const initialState = []

function reducer(state = initialState, action) {
  switch (action.type) {
    case a.ADD_CURRENT_TIME:
      return [...state, action.payload]
    case a.CLEAR_ALL_TIMES:
      return []
    default:
      return state
  }
}

export default reducer