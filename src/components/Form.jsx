import React, { Component } from 'react';
import Retriver from "./Retriver";


class Form extends Component {

    /* Gets this function from main component to be able to send the changed value in the
    category radio buttons as props to main so the states for current image, current text
    and current audio can be updated*/
    handleChange = (changeEvent) => {
        console.log(this.props.type, changeEvent.target.value);
        this.props.handleChange(this.props.type, changeEvent.target.value);

    }

    render() {

        const { title, type, options } = this.props;

        return ( 
        <div>    
            <div id = "img" className = "form">
                <form>
                    <p>{title}</p>
                    {options.map(item => (
                            <div>
                            <label>
                            <input type="radio" name={type} value={item} onChange={(e) => this.handleChange(e)}/>
                            {item}
                            </label>
                            </div>
                    ))
                    }
                </form>
            </div>
        </div> );
    }
}
 
export default Form;