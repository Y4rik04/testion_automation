const { asyncHello } = require('../labAssignment');

describe('asyncHello', () => {
    it('повертає проміс, що вирішується значенням "hello world"', async () => {
        await expect(asyncHello()).resolves.toBe('hello world');
    });
});

const { computeValue } = require('../labAssignment');

describe('computeValue', () => {
    it('повертає значення 94', async () => {
        const result = await computeValue();
        expect(result).toBe(94);
    });
});

const { asyncError } = require('../labAssignment');

describe('asyncError', () => {
    it('відхиляється з помилкою "Something went wrong"', async () => {
        await expect(asyncError()).rejects.toThrow('Something went wrong');
    });
});
