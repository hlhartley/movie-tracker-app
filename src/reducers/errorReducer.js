export const errorReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_ERROR':
      return action.message
    default:
      return state
  }

}