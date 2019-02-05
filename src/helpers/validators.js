export const validator = (type, value) => {
    const nameRegEx = /^[a-zA-Z\s]+$/
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const passwordRegEx = /^[a-zA-Z0-9@*#]{5,10}$/ 

    switch (type) {
        case 'email':
            return emailRegEx.test(value.trim());
        case 'name':
            return nameRegEx.test(value.trim());
        case 'password':
            return passwordRegEx.test(value);
        default:
            return false;
    }
}