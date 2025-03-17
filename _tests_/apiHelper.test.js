const { ApiHelper } = require('../labAssignment');

describe('ApiHelper', () => {
    it('метод fetchViaHelper повертає правильні дані', async () => {
        const mockApiCallFunction = jest.fn().mockResolvedValue({ data: 'mockData' });

        const apiHelper = new ApiHelper();
        const result = await apiHelper.fetchViaHelper(mockApiCallFunction);

        expect(result).toEqual({ data: 'mockData' });
    });

    it('метод fetchViaHelper кидає помилку для невалідних даних', async () => {
        const mockApiCallFunction = jest.fn().mockResolvedValue(null);

        const apiHelper = new ApiHelper();
        await expect(apiHelper.fetchViaHelper(mockApiCallFunction)).rejects.toThrow('Invalid data');
    });
});
