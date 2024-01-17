
import {createStore} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension'
import { todoReducer } from '../components/function/todoReducer';

const store = createStore(todoReducer, composeWithDevTools());
export default store;