import React from 'react'

import Template from '../PageTemplate'

export default () => {
    return (
        <Template title='Turing Completeness'>
            <h2>What is Turing Completeness?</h2>
            <p>
                Turing Completeness is a system in which a program can be written that will find an answer.
            </p>
            <p>
                This can be seen in Conways Game of Life because the system we are using is the written algorithm; and the algorithm allows us to come to a completed answer to this question: If I set-up 'x' boxes as alive, which boxes will be alive at the end?
            </p>
        </Template>
    )
}
