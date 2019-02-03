export const popupReducer = (state = false, action) => {
  switch(action.type) {
    case 'SHOW_POPUP':
      return action.showPopup
    default:
      return state
  }
}