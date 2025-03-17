const { ApiClient } = require('../labAssignment');

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ key: 'value' })
    })
);

describe('ApiClient', () => {
    it('метод fetchData повертає дані з полем fetchedAt', async () => {
        const apiClient = new ApiClient();
        const result = await apiClient.fetchData();

        expect(result).toHaveProperty('key', 'value');
        expect(result).toHaveProperty('fetchedAt');
        expect(typeof result.fetchedAt).toBe('number');
    });
});
