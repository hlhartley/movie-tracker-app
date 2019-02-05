import { validator } from './validators';

describe('Validator module testing', () => {
    it('should validate an email and return true if it is a valid email address', () => {
        const mockEmail = 'ShanRocks7@gmail.com';
        const type = 'email';
        const expected = true;
        const result = validator(type, mockEmail);
        expect(result).toEqual(expected);
    });

    it('should validate an email and return false it is is not a valid email address', () => {
        const mockEmail = 'ShanRocks7@g.g';
        const type = 'email';
        const expected = false;
        const result = validator(type, mockEmail);
        expect(result).toEqual(expected);
    });

    it('should validate a name and return true if it meets requirements of all letters', () => {
        const mockName = 'Shannon M';
        const type = 'name';
        const expected = true;
        const result = validator(type, mockName);
        expect(result).toEqual(expected);
    });

    it('should validate a name and return false if it includes anything other than letters or spaces', () => {
        const mockName = 'Shannon12';
        const type = 'name';
        const expected = false;
        const result = validator(type, mockName);
        expect(result).toEqual(expected);
    });

    it('should validate a password and return true if the password is between 5 and 10 characters', () => {
        const mockPassword = 'p@ss12';
        const type = 'password';
        const expected = true;
        const result = validator(type, mockPassword);
        expect(result).toEqual(expected);

    });

    it('should validate a password and return false if the password is less than 5 characters', () => {
        const mockPassword = 'p@s';
        const type = 'password';
        const result = validator(type, mockPassword);
        const expected = false;
        expect(result).toEqual(expected);
    });

    it('should validate a password and return false if the password is greater than 10 characters', () => {
        const mockPassword = 'passWord12344';
        const type = 'password';
        const result = validator(type, mockPassword);
        const expected = false;
        expect(result).toEqual(expected);
    });
});