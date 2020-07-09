import React from 'react';
import './Button';
import {CellState,CellValue} from '../../types';

interface ButtonProps {
    row : number;
    col : number;
    state : CellState;
    value : CellValue;
}

const Button : React.FC = ({row, col, state, value}) => {

    const renderContent = () : React.ReactNode => {
        if(state === CellState.visible){
            if(value === CellValue.bomb){
            return ( <span role="img" aria-label="face">
                            💣
            </span> )
            }else if(value === CellValue.none){
                return null;
            }
            return value;
        }else if(state === CellState.flagged){
            return ( <span role="img" aria-label="face">
                            🚩
            </span> )
        }

        return null;
    };
    return <div className={`Button ${state === CellState.visible ? 'visible' : ''}`}>
        {renderContent()}
    </div>
};
export default Button;