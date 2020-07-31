import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom';

export default () => {

    const history = useHistory();
    const path = history.location.pathname.replace('/', '');
    
    const [trigger, setTrigger] = useState(0);
    const refresh = () => {
        if(trigger === 0) setTrigger(1);
        else setTrigger(0);
    }

    return (
        <nav className='box__nav'>
            {/* <ul>
                <li className={`${path === 'game' ? 'current' : ''}`} onClick={refresh}><Link to='/game'>The Game</Link></li>
                <li className={`${path === 'ca' ? 'current' : ''}`} onClick={refresh}><Link to='/ca'>Cellular Automata</Link></li>
                <li className={`${path === 'tc' ? 'current' : ''}`} onClick={refresh}><Link to='/tc'>Turing Completeness</Link></li>
                <li className={`${path === 'db' ? 'current' : ''}`} onClick={refresh}><Link to='/db'>Double Buffer</Link></li>
            </ul> */}
            <ul className='box__nav__list'>
                <Link className={`box__nav__list--item ${path === 'game' ? 'current' : ''}`} to='/game' onClick={refresh}>The Game</Link>
                <Link className={`box__nav__list--item ${path === 'ca' ? 'current' : ''}`} to='/ca' onClick={refresh}>Cellular Automata</Link>
                <Link className={`box__nav__list--item ${path === 'tc' ? 'current' : ''}`} to='/tc' onClick={refresh}>Turing Completeness</Link>
                <Link className={`box__nav__list--item ${path === 'db' ? 'current' : ''}`} to='/db' onClick={refresh}>Double Buffer</Link>
            </ul>
        </nav>
    )
}
