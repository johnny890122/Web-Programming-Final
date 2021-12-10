import React from 'react'
import Remove_btn from './Remove_btn'


function Todo(props) {
    return (
         <li className="todo-app__item">
            <div className="todo-app__checkbox" >
                <input type="checkbox" 
                       id={ props.index } 
                       checked={props.checked} 
                       onClick={ props.set_done } />
                <label htmlFor={ props.index } />
            </div>

            <h1 className={props.className}> {props.text} </h1>

            <Remove_btn onClick={props.remove_item} / >
        </li>
    );
}

export default Todo;