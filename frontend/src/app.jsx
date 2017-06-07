// React
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as reduxFormReducer } from 'redux-form'

// Components
import EmployeeList from './components/EmployeeList'
import Employee from './components/Employee'

// Reducers
import employee from './redux/reducers/employee-reducer'

// actions
import {getEmployees} from './redux/actions/employee-actions'

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './App.scss'

// premier niveau du state, contenant l'état de chaque reducer
const reducers = combineReducers(Object.assign({},
  {routing: routerReducer},
  {form: reduxFormReducer},
  {employee: employee}
))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, routerMiddleware(hashHistory))))

render(
    <Provider store={store}>
      <Router history={syncHistoryWithStore(hashHistory, store)}>
          <Route path="/" component={EmployeeList}/>
          <Route path="/Employee/:employeeId" component={Employee}/>
      </Router>
    </Provider>
    ,
    document.getElementById('app')
  )
// Chargement de la liste des empoyés
store.dispatch(getEmployees())
