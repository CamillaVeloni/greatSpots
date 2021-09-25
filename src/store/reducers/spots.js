import Spot from '../../models/spot';
import { ADD_SPOT } from '../actions/spots';

const INITIAL_STATE = {
  spots: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SPOT:
      const newSpot = new Spot(
        new Date().toString(),
        action.payload.title,
        action.payload.photo
      );
      return {
        spots: state.spots.concat(newSpot),
      };
    default:
      return state;
  }
};
