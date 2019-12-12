import React, { Component } from 'react';

class SetFavorite extends Component {

    render() { 
        return ( 
            <div className="">
            <button id="setfavorite-btn" onClick={()=> this.props.onSetFavoriteClick()}>♥</button>
        </div> 
         );
    }
}
 
export default SetFavorite;