import React from 'react'

import Template from '../PageTemplate'

export default () => {
    return (
        <Template title='Cellular Automata'>
            <h2>What is Cellular Automata?</h2>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Cellular Automation is a collection of "colored" cells on a grid of specified shape that evolves through a number of discrete time steps according to a set of rules based on the states of neighboring cells. The rules are then applied iteratively for as many time steps as desired.</p>
            
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Cellular automata come in a variety of shapes and varieties. One of the most fundamental properties of a cellular automaton is the type of grid on which it is computed. The simplest such "grid" is a one-dimensional line. In two dimensions, square, triangular, and hexagonal grids may be considered.</p>

            <p>&nbsp;&nbsp;&nbsp;&nbsp;The number of colors (or distinct states) 'k' a cellular automaton may assume must also be specified. This number is typically an integer, with k=2 (binary) being the simplest choice. For a binary automaton, color 0 is commonly called "white," and color 1 is commonly called "black". However, cellular automata having a continuous range of possible values may also be considered.</p>

            <p className='source'>Source: <a target='_blank' href='https://mathworld.wolfram.com/CellularAutomaton.html#:~:text=A%20cellular%20automaton%20is%20a,many%20time%20steps%20as%20desired'>MathWorld</a></p>

            <h2>How can Cellular Automata be compared to real life?</h2>
            
            <p>Cellular Automata can be referenced to a pandemic. The rules of Conway's Game of Life and Cellular Automata are simular to how a pandemic would spread among citizens. If citizens become to close to eachother, the pandemic continues to reproduce and spread. If someone that has been infected by the pandemic isolates themselves alone or with only other people who are infected, then the pandemic can not spread to healthy people and continue to reproduce.</p>
        </Template>
    )
}
