const { calculateFinalPrice } = require('../labAssignment');

describe('calculateFinalPrice', () => {
    it('обчислює фінальну ціну для валідного замовлення', () => {
        const mockDiscountService = {
            getDiscount: jest.fn().mockReturnValue(0.2)
        };

        const order = {
            items: [{ price: 100, quantity: 2 }],
            taxRate: 0.1
        };

        const result = calculateFinalPrice(order, mockDiscountService);

        expect(result).toBe(198);
    });

    it('кидає помилку для невалідних даних', () => {
        const order = { items: [] };

        expect(() => calculateFinalPrice(order)).toThrow('Invalid order');
    });
});
