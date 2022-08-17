import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {allReducers} from '../combine-reducers/index';

const rootReducer = allReducers;

export const Store = createStore(rootReducer, applyMiddleware(thunk));

// console.log('Here is the store ', Store.getState());
