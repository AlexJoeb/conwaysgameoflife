import React from 'react'

import Header from './BoxHeader';
import Nav from './BoxNav';
import TheGame from '../Pages/TheGame';
import CellAutomata from '../Pages/CellAutomata';
import TuringCompleteness from '../Pages/TuringCompleteness';
import DoubleBuffer from '../Pages/DoubleBuffer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default () => {
    return (
        <div className='box'>
            <Router>
                <Header />
                <Nav />
                <Switch>
                    <Route path='/' exact render={props => props.history.push('/game')} />
                    <Route path='/game' component={TheGame} />
                    <Route path='/ca' component={CellAutomata} />
                    <Route path='/tc' component={TuringCompleteness} />
                    <Route path='/db' component={DoubleBuffer} />
                </Switch>
            </Router>
        </div>
    )
}
