export const getUser = async (user) => {
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.status >= 300) {
        throw Error(`Email and Password Do Not Match: ${response.statusText}`)
    } else {
        const result = await response.json();
        return result;
    }
} 