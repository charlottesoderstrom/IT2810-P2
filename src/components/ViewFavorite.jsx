import React, { Component } from 'react';

class ViewFavorite extends Component {

    render() { 
        return ( 
            <div className="viewfavorite-container">
            <button id="viewFavorite-btn" onClick={()=> this.props.onViewFavoriteClick()} >View favorite</button>
        </div> 
         );
    }
}
 
export default ViewFavorite;