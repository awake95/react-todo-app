import { createStore, combineReducers, applyMiddleware } from 'redux';
import { todoReducer } from './todoReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  todo: todoReducer
})

export const store = createStore( rootReducer, composeWithDevTools(applyMiddleware(thunk)));
