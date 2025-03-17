const { OrderProcessor } = require('../labAssignment');

describe('OrderProcessor', () => {
    it('обчислює правильну фінальну ціну після конвертації', async () => {
        const mockCurrencyConverter = jest.fn().mockResolvedValue(500);

        const order = {
            items: [{ price: 100, quantity: 2 }],
            taxRate: 0.1,
            discountService: { getDiscount: () => 0.1 },
            currency: 'USD'
        };

        const orderProcessor = new OrderProcessor(mockCurrencyConverter);
        const result = await orderProcessor.processOrder(order, 'EUR');

        expect(result).toBe(500);
    });

    it('повертає оригінальну ціну, якщо конвертер кидає помилку', async () => {
        const mockCurrencyConverter = jest.fn().mockRejectedValue(new Error('Conversion failed'));

        const order = {
            items: [{ price: 100, quantity: 1 }],
            taxRate: 0.1,
            discountService: { getDiscount: () => 0.1 },
            currency: 'USD'
        };

        const orderProcessor = new OrderProcessor(mockCurrencyConverter);
        const result = await orderProcessor.processOrder(order, 'EUR');

        expect(result).toBe(99);
    });
});
