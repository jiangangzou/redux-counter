import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore }   from 'redux';
import Counter from './components/Counter'
import counter from './reducers';

const store = createStore(counter);
const rootEl = document.getElementById('root')
const render = () => {
    ReactDOM.render(<Counter value={store.getState()} onIncrement={() => store.dispatch({
        type: "INCREMENT"
    })}
    onDecrement={() => store.dispatch({
        type: 'DECREMENT'
    })}
    />,rootEl)
}
render();
store.subscribe(render)
// ReactDOM.render(<div>{  store.getState() } </div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
//单独构建状态树,状态是跟UI统一的

