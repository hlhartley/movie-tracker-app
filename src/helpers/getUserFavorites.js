export const getUserFavorites = async (user_id) => {
    const response = await fetch(`http://localhost:3000/api/users/${user_id}/favorites`)
    if(response.status >= 300) {
        throw Error(`Error getting favorites: ${response.statusText}`)
    } else {
        const result = response.json()
        return result
    }
}