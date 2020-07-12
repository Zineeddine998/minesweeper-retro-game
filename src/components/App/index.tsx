import React, {useEffect, useState} from 'react';
import './App.scss'
import NumberDisplay from '../NumberDsiplay';
import {generateCells} from "../../utils";
import Button from '../Button/index'
import {Face, Cell , CellState, CellValue} from '../../types'
const App : React.FC = () => {

    const [cells, setCells] = useState<Cell[][]>(generateCells());
    const [face , setFace] = useState(Face.smile);
    const [time, setTime ] = useState<number>(0);
    const [live, setLive] = useState<boolean>(false);

    useEffect(() => {
        const handleMouseDown = () => {
            setFace(Face.oh);
        };
        const handleMouseUp = () => {
            setFace(Face.smile);
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () =>{
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup' ,handleMouseUp);
        }
    }, []);

    useEffect(() => {
        if(live){
            const timer = setInterval(() => {
                setTime(time + 1);

            }, 1000);
            return () =>{
                clearInterval(timer);
            }
        }
    }, [live, time]);

    const handleCellClick = (rowParam : number, colParam : number) =>  () : void =>{
       if(!live) {
           setLive(true);
       }
    };
   const handleFaceClick  = () : void => {
       if(live){
           setLive(false);
           setTime(0);
           setCells(generateCells());

       }

   };

   const handleCellContext = (
       rowParam : number,
       colParam : number,

   ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
       e.preventDefault();
       if(!live){
           return;
       }
       const currentCell = cells[rowParam][colParam];
       const currentCells = cells.slice();

       if(currentCell.state === CellState.visible){
           return ;
       }else if(currentCell.state  === CellState.open){
        currentCells[rowParam][colParam].state = CellState.flagged;
        setCells(currentCells);
       }

   };

    const renderCells = () : React.ReactNode => {
        return cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
                <Button key={`${rowIndex}-${colIndex}`}
                        row={rowIndex}
                        col={colIndex}
                        state={cell.state}
                        onclick={handleCellClick}
                        onContext={handleCellContext}
                />
            ))
    );
    };

    return (
       <div className = "App">
           <div className = "Header">
               <NumberDisplay value = {0}/>
               <div className = "Face" onclick={handleFaceClick}>
                     <span role="img" aria-label="face">
                   {face}
                     </span>
               </div>
               <NumberDisplay value = {time}/>
           </div>
           <div className = "Body">{renderCells()}</div>
       </div>
    )
};
export default App;