import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import spotsReducer from './reducers/spots';

const rootReducer = combineReducers({
    spots: spotsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));