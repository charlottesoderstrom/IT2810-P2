import React from 'react';

const MusicPlayer = (props) => {
        return(
            <div>
                <button style={{visibility: props.visible ? 'visible' : 'hidden'}} className='playButton' onClick={ props.togglePlayer}>{props.title}</button>
            </div>
        )
}

export default MusicPlayer;
