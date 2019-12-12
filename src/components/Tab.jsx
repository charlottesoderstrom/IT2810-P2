import React from 'react';

/* Tab is a functional component*/
const Tab = (props) => {
    return ( 
        <div className="tab-container">
            <button id="Gallery1" onClick={()=> props.onTabClick(0)}> Louvre museum</button>
            <button id="Gallery2" onClick= {()=> props.onTabClick(1)}>Munch museum</button>
            <button id="Gallery3" onClick= {()=> props.onTabClick(2)}>Sistine Chapel</button>
            <button id="Gallery4" onClick= {()=> props.onTabClick(3)}>Rijks museum</button>
        </div> );
}
export default Tab;