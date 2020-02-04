import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import StreamCreate from '../components/streams/streamCreate';
import StreamDelete from '../components/streams/streamDelete';
import StreamEdit from '../components/streams/streamEdit';
import StreamList from '../components/streams/streamList';
import StreamShow from '../components/streams/streamShow';
import Header from '../components/header';
import history from '../history'; // Use of history obeject and Router in place of BrowserRouter

const App = () => (
    <div className='ui container'>
        <Router history={history}>
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={StreamList} />
                    <Route exact path='/streams/new' component={StreamCreate} />
                    <Route exact path='/streams/delete/:id' component={StreamDelete} />
                    <Route exact path='/streams/edit/:id' component={StreamEdit} />
                    <Route exact path='/streams/:id' component={StreamShow} />
                </Switch>
            </div>
        </Router>
    </div>
);

export default App;
