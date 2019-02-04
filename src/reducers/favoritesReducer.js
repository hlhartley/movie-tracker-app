export const favoritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return [...state, action.id]
        case 'REMOVE_FAVORITE':
            return state.filter((favorite) => {
                return favorite !== action.id
            })
        case 'RESET_FAVORITES':
            return []
        default:
            return state
    }
}