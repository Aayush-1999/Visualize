import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import i18n from './i18next';
import stepperReducer from './store/reducers/stepper';
import chartDataReducer from './store/reducers/chartData';
import Spinner from './Components/UI/Spinner/Spinner';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({
    stepper:stepperReducer,
    chartData:chartDataReducer
});

const store=createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

const app=(
    <Provider store={store} >
        <BrowserRouter>
            <Suspense fallback={<Spinner />}>
                <App />
            </Suspense>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
