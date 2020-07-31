import React, { Component } from 'react'

import Template from '../PageTemplate';
import StatBar from '../Bars/StatBar';
import ModeBar, { PresetList } from '../Bars/ModeBar';
import { FreeplayList } from '../Bars/ModeBar';

export default class TheGame extends Component {
    
    
    constructor(props){
        super(props);
        this.state = {
            ctx: null,
            width: 400,
            height: 400,
            grid: [],
            generation: 0,
            population: 0,
            mode: 'freeplay',
            clickShape: 'block',
            currentPreset: 'fireworks',
            ShapeTypes: [
                'block',
                'bee_hive',
                'loaf',
                'boat',
                'tub',
                'blinker',
                'toad',
                'beacon',
                'penta_decathlon'
            ],
            PresetTypes: [
                'pulsar',
                'randomize'
            ]
        }
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
                this.checkPopulation();
                this.setState(prev => ({ ...prev, generation: prev.generation + 1}))
                this.updateCanvas();
            }, 100);
        })
    }

    checkAllCells = () => {
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

    placeSquare = (x, y, color) => {
        const { ctx } = this.state;
        ctx.fillStyle = color ? 'white' : 'black';
        ctx.fillRect(x, y, 10, 10);
    }

    updateCanvas = () => {
        const { width, height, grid, population, generation } = this.state;
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
        const { printShape } = this;
        const { mode, clickShape } = this.state;

        if(mode !== 'freeplay') return;
        else {
            if(!clickShape) return;
            else {
                let newGrid = this.state.grid;
                newGrid = printShape(y, x, clickShape, newGrid)

                this.setState({ grid: newGrid })                
                this.updateCanvas();
            }
        }
    }

    checkPopulation = () => {
        const { grid } = this.state;
        let pop = 0;
        grid.forEach(row => {
            row.forEach(elem => pop += elem);
        })
        this.setState({
            population: pop,
        })
    }

    resetBoard = () => {
        const { height, width } = this.state;

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
            grid,
            population: 0,
            generation: 0,
        });
    }

    setMode = mode => {
        this.setState({ mode });
    }

    setShape = clickShape => {
        this.setState({ clickShape })
    }

    setPreset = preset => {
        this.setState({ currentPreset: preset });

        const { height, width } = this.state;
        
        let grid = [];
        for(let i = 0; i < height / 10; i++){
            grid.push([]);
        }

        grid.forEach(arr => {
            for(let i = 0; i < width / 10; i++) {
                arr.push(0);
            }    
        })

        switch(preset){
            case 'randomize':
                for(let y = 0; y < grid.length; y++){
                    for(let x = 0; x < grid[y].length; x++){
                        const chance =Math.floor(Math.random() * 101);
                        if(chance <= 15){
                            grid[y][x] = 1;
                        }else continue;
                    }
                }
                console.log('completed..')
                break;
            case 'pulsar':
                const y = Math.floor((height / 10) / 2);
                const x = Math.floor((width / 10) / 2);
                
                // Top Left Leaf.
                grid[y-2][x-1] = 1;
                grid[y-3][x-1] = 1;
                grid[y-4][x-1] = 1;
                grid[y-6][x-2] = 1;
                grid[y-6][x-3] = 1;
                grid[y-6][x-4] = 1;

                grid[y-1][x-2] = 1;
                grid[y-1][x-3] = 1;
                grid[y-1][x-4] = 1;
                grid[y-2][x-6] = 1;
                grid[y-3][x-6] = 1;
                grid[y-4][x-6] = 1;

                grid[y-2][x+1] = 1;
                grid[y-3][x+1] = 1;
                grid[y-4][x+1] = 1;
                grid[y-6][x+2] = 1;
                grid[y-6][x+3] = 1;
                grid[y-6][x+4] = 1;

                grid[y-1][x+2] = 1;
                grid[y-1][x+3] = 1;
                grid[y-1][x+4] = 1;
                grid[y-2][x+6] = 1;
                grid[y-3][x+6] = 1;
                grid[y-4][x+6] = 1;
                
                grid[y+2][x-1] = 1;
                grid[y+3][x-1] = 1;
                grid[y+4][x-1] = 1;
                grid[y+6][x-2] = 1;
                grid[y+6][x-3] = 1;
                grid[y+6][x-4] = 1;

                grid[y+1][x-2] = 1;
                grid[y+1][x-3] = 1;
                grid[y+1][x-4] = 1;
                grid[y+2][x-6] = 1;
                grid[y+3][x-6] = 1;
                grid[y+4][x-6] = 1;

                grid[y+2][x+1] = 1;
                grid[y+3][x+1] = 1;
                grid[y+4][x+1] = 1;
                grid[y+6][x+2] = 1;
                grid[y+6][x+3] = 1;
                grid[y+6][x+4] = 1;

                grid[y+1][x+2] = 1;
                grid[y+1][x+3] = 1;
                grid[y+1][x+4] = 1;
                grid[y+2][x+6] = 1;
                grid[y+3][x+6] = 1;
                grid[y+4][x+6] = 1;
        }
        console.log('updating..')
        console.log(grid);
        this.setState({ grid }, () => {
            this.updateCanvas();
        });
    }

    printShape = (y, x, clickShape, grid) => {
        switch(clickShape) {
            case 'block':
                grid[y][x] = 1;
                grid[y][x+1] = 1;
                grid[y+1][x] = 1;
                grid[y+1][x+1] = 1;
                return grid;
            case 'bee_hive':
                grid[y][x] = 1;
                grid[y][x+2] = 1;
                grid[y+1][x+1] = 1;
                grid[y+1][x+2] = 1;
                grid[y-1][x+1] = 1;
                grid[y-1][x+2] = 1;
                return grid;
            case 'loaf':
                grid[y][x+1] = 1;
                grid[y][x+2] = 1;
                grid[y+1][x] = 1;
                grid[y+1][x+3] = 1;
                grid[y+2][x+1] = 1;
                grid[y+2][x+3] = 1;
                grid[y+3][x+2] = 1;
                return grid;
            case 'boat':
                grid[y][x] = 1;
                grid[y][x+1] = 1;
                grid[y+1][x] = 1;
                grid[y+1][x+2] = 1;
                grid[y+2][x+1] = 1;
                return grid;
            case 'tub':
                grid[y-1][x] = 1;
                grid[y+1][x] = 1;
                grid[y][x+1] = 1;
                grid[y][x-1] = 1;
                return grid;
            case 'blinker':
                grid[y][x] = 1;
                grid[y-1][x] = 1;
                grid[y+1][x] = 1;
                return grid;
            case 'toad':
                grid[y][x] = 1;
                grid[y][x+1] = 1;
                grid[y][x+2] = 1;
                grid[y+1][x+1] = 1;
                grid[y+1][x] = 1;
                grid[y+1][x-1] = 1;
                return grid;
            case 'beacon':
                grid[y][x] = 1;
                grid[y][x+1] = 1;
                grid[y+1][x] = 1;
                grid[y+2][x+3] = 1;
                grid[y+3][x+3] = 1;
                grid[y+3][x+2] = 1;
                return grid;
            case 'penta_decathlon':
                grid[y-3][x] = 1;
                grid[y-2][x] = 1;
                grid[y-1][x-1] = 1;
                grid[y-1][x+1] = 1;
                grid[y][x] = 1;
                grid[y+1][x] = 1;
                grid[y+2][x] = 1;
                grid[y+3][x] = 1;
                grid[y+4][x-1] = 1;
                grid[y+4][x+1] = 1;
                grid[y+5][x] = 1;
                grid[y+6][x] = 1;
                return grid;
            default:
                return grid;
        }
    }

    render() {
        const { handleCanvasClick, setState, resetBoard, setMode, setShape, setPreset } = this;
        const { width, height, grid, population, generation, mode, ShapeTypes, PresetTypes, clickShape, currentPreset } = this.state;
        const { canvas } = this.refs;

        return (
            <Template title="The Game">
                <div className='template__flex dynamic-wrap'>
                    <canvas style={{
                        width, height
                    }} onClick={e => handleCanvasClick(e, canvas, grid, setState)} ref="canvas" width={width} height={height} />
                    <div className='template__flex child static-down'>
                        <StatBar population={population} generation={generation} resetBoard={resetBoard}/>
                        <ModeBar mode={mode} setMode={setMode} />
                        <FreeplayList mode={mode} ShapeTypes={ShapeTypes} clickShape={clickShape} setShape={setShape} />
                        <PresetList mode={mode} PresetTypes={PresetTypes} currentPreset={currentPreset} setPreset={setPreset} />
                    </div>
                </div>
                <h2>Rules of the Game</h2>
                <ul>
                    <li>• Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>• Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>• Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>• Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                </ul>
                <h2>What is Conway's Game of Life?</h2>
                <p>The Game of Life is a cellular automation devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>
                <p className='source'>• Source: <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia</a></p>
            </Template>
        )
    }
}
