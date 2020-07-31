import React from 'react'

export default ({ title, children }) => {
    return (
        <div className='template'>
            <h1 className='template__title'>{ title }&nbsp;<span>—</span></h1>
            <div className='template__content'>
                { children }
            </div>
        </div>
    )
}
