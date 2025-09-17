export const getFirestore = jest.fn(() => ({}));
export const collection = jest.fn(() => ({}));
export const addDoc = jest.fn(() => Promise.resolve({}));
export const getDocs = jest.fn(() =>
  Promise.resolve({
    docs: [{ data: () => ({ name: 'Test Item' }) }],
  })
);
