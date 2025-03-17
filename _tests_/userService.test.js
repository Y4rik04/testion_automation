const { UserService } = require('../labAssignment');

describe('UserService', () => {
    it('метод greet() викликає getFullName з правильними аргументами та повертає вірний результат', () => {
        const mockGetFullName = jest.fn().mockReturnValue('John Doe');
        const userService = new UserService(mockGetFullName);

        const result = userService.greet();

        expect(mockGetFullName).toHaveBeenCalledWith('John', 'Doe');
        expect(result).toBe('HELLO, JOHN DOE!');
    });
});