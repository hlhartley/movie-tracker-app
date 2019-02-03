export const createNewUser = async (user) => {

  const response = await fetch('http://localhost:3000/api/users/new', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 300) {
    throw Error(`Email has already been used: ${response.statusText}`);
  } else {
    const result = await response.json();
    return result;
  }

}