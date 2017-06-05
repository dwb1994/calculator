import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './view/home';
import Detail from './view/detail';
import './index.css';

ReactDOM.render((
     <Router history={browserHistory}>
         <div>
             <Route path="/home" component={Home}/>
             <Route path="/detail" component={Detail}/>
         </div>
     </Router>
     ),
     document.getElementById('root')
);
