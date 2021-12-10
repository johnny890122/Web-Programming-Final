import React from 'react'

function Footer(props) {
    return (
        <footer class="todo-app__footer" id="todo-footer" style={{"display": props.footer}}>
            <div class="todo-app__total">{props.cnt} left</div>
            <ul class="todo-app__view-buttons">
                <li><button id="all_btn" onClick={props.filter_all}>All</button></li>
                <li><button id="active_btn" onClick={ props.filter_active }>Active</button></li>
                <li><button id="completed_btn" onClick={props.filter_completed}>Completed</button></li>
            </ul>

            <div class="todo-app__clean" >
                <button id = "clean_btn" onClick={props.clear_completed}>Clear completed</button>
            </div>
        </footer>
    );
}

export default Footer;