import React from 'react'

function Input (props) {
    return (
        <input  class="todo-app__input" 
                placeholder="What needs to be done?" 
                onKeyDown={props.onKeyDown}
                onChange={props.onChange}
                value={props.value} />
    );
}

export default Input;  