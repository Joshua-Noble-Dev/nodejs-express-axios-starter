import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getToken } from "../../../src/services/AuthService";
import { LoginRequest } from '../../../src/models/LoginRequest';
import { expect } from 'chai';

// Initialize the mock adapter
const mock = new MockAdapter(axios);

describe('getToken', () => {
    afterEach(() => {
        // Reset the mock adapter after each test
        mock.reset();
    });

    it('should return a token when login is successful', async () => {
        // Arrange
        const loginRequest: LoginRequest = { username: 'testuser', password: 'password123' };
        const mockToken = 'mocked-token';
        mock.onPost("/api/auth/login", loginRequest).reply(200, mockToken);

        // Act
        const token = await getToken(loginRequest);

        // Assert
        console.log(token)
        expect(token == mockToken).to.be.true;
    });

    it('should throw an error when login fails', async () => {
        // Arrange
        const loginRequest: LoginRequest = { username: 'testuser', password: 'wrongpassword' };
        const mockErrorMessage = 'Invalid credentials';
        mock.onPost('http://localhost:8080/api/auth/login', loginRequest).reply(401, mockErrorMessage);

        // Act & Assert
        //await expect(getToken(loginRequest)).toThrow(mockErrorMessage);
        try {
            await getToken(loginRequest);
            throw new Error('Error not thrown');
          } catch (e) {
            expect(e.message).to.equal('Failed to Login');
            return;
    }});
});