import Spot from '../../models/spot';
import { ADD_SPOT, SET_SPOTS } from '../actions/spots';

const INITIAL_STATE = {
  spots: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return {
        spots: action.payload.map(
          (spot) => new Spot(spot.id.toString(), spot.title, spot.photoUri)
        ),
      };
    case ADD_SPOT:
      const newSpot = new Spot(
        action.payload.id,
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
