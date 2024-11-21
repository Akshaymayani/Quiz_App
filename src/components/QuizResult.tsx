import React from 'react';
import '../App.css';

interface Props {
    score: number;
    total_score: number;
    tryAgain: () => void;
}

function Quiz_result(props: Props) {
    const { score, total_score, tryAgain } = props;
    return (
        <div className='result'>
            Your Score : {score}<br />
            Total Score : {total_score}<br /><br />
            <button className='show' onClick={tryAgain}>Try Again</button>
        </div>
    )
}

export default Quiz_result;
