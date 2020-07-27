import React from 'react'

import Header from './BoxHeader';
import Nav from './BoxNav';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default () => {
    return (
        <div className='box'>
            <Router>
                <Header />
                <Nav />
                <Switch>
                    <Route path='/' exact render={props => props.history.push('/game')} />
                </Switch>
            </Router>
        </div>
    )
}
