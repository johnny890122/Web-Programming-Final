import React from 'react'
import close_png from '../img/x.png'

export default ({ onClick }) => {
	return <img className="todo-app__item-x" src= {close_png} onClick ={onClick}/>;
}