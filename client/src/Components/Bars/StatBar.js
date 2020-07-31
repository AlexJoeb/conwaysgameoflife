import React from 'react'

export default ({ generation, population, resetBoard }) => {
    return (
        <ul className='statbar'>
            <div className='statbar__generation'>
                <p>Generation</p>
                <p>{ generation }</p>
            </div>
            <div className='statbar__population'>
                <p>Population</p>
                <p>{ population }</p>
            </div>
            <button onClick={resetBoard}>Reset Board</button>
        </ul>
    )
}
