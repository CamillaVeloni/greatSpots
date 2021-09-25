export const ADD_SPOT = 'addSpot';

export const savingSpot = (title, photo) => {
  return {
    type: ADD_SPOT,
    payload: { title, photo },
  };
};
