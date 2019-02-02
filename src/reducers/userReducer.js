export const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return { id: action.id, name: action.name }
        case 'LOGOUT_USER':
            return null 
        default:
            return state
    }
}