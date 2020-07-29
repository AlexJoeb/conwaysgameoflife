import React, { Component } from 'react'

import Template from '../PageTemplate';

export default class TheGame extends Component {
    
    state = {
        ctx: null,
        width: 400,
        height: 400,
        grid: []
    }

    componentDidMount() {
        const { width, height } = this.state;
        const ctx = this.refs.canvas.getContext('2d');
        
        let grid = [];
        for(let i = 0; i < height / 10; i++){
            grid.push([]);
        }

        grid.forEach(arr => {
            for(let i = 0; i < width / 10; i++) {
                arr.push(0);
            }    
        })

        this.setState({
            ctx,
            grid
        }, () => {
            const interval = setInterval(() => {
                this.checkAllCells();
                console.log(this.state.grid);
                this.updateCanvas();
            }, 100);
        })
    }

    checkAllCells() {
        const { grid, width } = this.state;
        
        let newGrid = []; // [[], [], []...]
        grid.forEach(arr => newGrid.push([]));

        newGrid.forEach(arr => {
            for(let i = 0; i < width / 10; i++) {
                arr.push(0);
            }    
        })

        for(let y = 0; y < grid.length; y++){
            for(let x = 0; x < grid[y].length - 1; x++){
                const cell = grid[y][x];

                // Amount of alive cells around the target cell.
                let alive = 0;

                // Checking edge cases before checking the value of cell.
                if(y > 0){
                    if(x > 0){
                        // Append top left square to value of alive.
                        alive += grid[y-1][x-1];
                    }
                    if(x < grid[y].length - 1){
                        // Append top right square to value of alive.
                        alive += grid[y-1][x+1];
                    }
                    // Append top center square to value of alive.
                    alive += grid[y-1][x];
                }

                if(x > 0){
                    // Append center left square to value of alive.
                    alive += grid[y][x-1];
                }

                if(x < grid[y].length - 1){
                    // Append center right square to value of alive.
                    alive += grid[y][x+1]
                }

                if(y < grid.length - 1){
                    if(x > 0) {
                        // Append bottom left square to value of alive.
                        alive += grid[y+1][x-1]
                    }
                    if(x < grid[y].length - 1) {
                        // Append bottom right square to value of alive.
                        alive += grid[y+1][x+1]
                    }

                    // Append center left square to value of alive.
                    alive += grid[y+1][x];
                }

                // Now that we `alive` count of the cells around the target cell, we can update the cell accordingly.
                if(cell === 0 && alive === 3) newGrid[y][x] = 1;
                else {
                    if(cell === 0) newGrid[y][x] = 0;
                    else {
                        if(alive < 2 || alive > 3) newGrid[y][x] = 0;
                        else newGrid[y][x] = 1;
                    }
                }
            }
        }
        
        this.setState({
            grid: newGrid
        });
    }

    placeSquare(x, y, color) {
        const { ctx } = this.state;
        ctx.fillStyle = color ? 'white' : 'black';
        ctx.fillRect(x, y, 10, 10);
    }

    updateCanvas() {
        const { width, height, grid } = this.state;
        for(let x = 0, a = 0; x < width, a < grid.length; x+=10, a++){
            for(let y = 0, b = 0; y < height, b < grid[a].length; y+=10, b++){
                this.placeSquare(x, y, grid[a][b]);
            }
        }
        console.log("Canvas Updated.")
    }

    handleCanvasClick = (event, canvas) => {
        const { left, top } = canvas.getBoundingClientRect();
        const { clientX, clientY} = event;
        const y = Math.ceil((clientX - left) / 10), x = Math.ceil((clientY - top) / 10);

        let newGrid = this.state.grid;
        
        newGrid[y][x] = 1;
        newGrid[y+1][x] = 1;
        newGrid[y-1][x] = 1;
        newGrid[y][x-1] = 1;
        newGrid[y][x+1] = 1;

        this.setState({grid: newGrid});
        this.updateCanvas();
    }

    render() {
        const { handleCanvasClick, setState } = this;
        const { width, height, grid } = this.state;
        const { canvas } = this.refs;

        return (
            <Template title="The Game">
                <canvas onClick={e => handleCanvasClick(e, canvas, grid, setState)} ref="canvas" width={width} height={height} />
                <h2>Rules of the Game</h2>
                <ul>
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                </ul>
                <h2>What is Conway's Game of Life?</h2>
            </Template>
        )
    }
}
