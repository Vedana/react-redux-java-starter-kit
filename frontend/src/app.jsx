// React
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory  } from 'react-router';

// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {syncHistoryWithStore, routerMiddleware,routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

// Components
import EmployeeList from './components/EmployeeList';
import Employee from './components/Employee';

// Reducers
import employee from './redux/reducers/employee-reducer';

// actions
import {getEmployees} from './redux/actions/employee-actions';

// Stylesheets
import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './app.scss';


// premier niveau du state, contenant l'état de chaque reducer
const reducers = combineReducers(Object.assign({},
  {routing: routerReducer},
  employee
));

const store = createStore(reducers, applyMiddleware(thunkMiddleware,routerMiddleware(hashHistory)));

render(
    <Provider store={store}>
      <Router history={syncHistoryWithStore(hashHistory, store)}>
          <Route path="/" component={EmployeeList}/>
          <Route path="/Employee" component={Employee}/>
      </Router>
    </Provider>
    ,
    document.getElementById('app')
  );

  // Chargement de la liste des empoyés
  store.dispatch(getEmployees());
