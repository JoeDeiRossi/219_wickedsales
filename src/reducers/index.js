
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './user_reducer';
import productsReducer from './products_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    products: productsReducer,
    user: userReducer
});

export default rootReducer;
