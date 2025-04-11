const { spec } = require('pactum');

describe('Dictionary API', () => {
  const words = ['hello', 'world', 'cat', 'love', 'school'];

  words.forEach(word => {
    test(`Слово "${word}" має приклади`, async () => {
      const res = await spec().get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).returns('[0].meanings');
      const hasExamples = res.some(meaning =>
        meaning.definitions.some(def => def.example)
      );
      expect(hasExamples).toBe(true);
    });
  });
});
