import './App.css';
import React from 'react';
import Input from './components/Input'
import Todo from './components/Todo'
import Footer from './components/Footer'

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { index: 0, footer: "none", text: '', records: [], status: 'all' }
    }

    update_records = (event) => {
        if (event.key === "Enter") {
            let record = {text: this.state.text, index: this.state.index, done: false, deleted: false}
            this.setState(
                (state) => ( 
                    {text: '', records: state.records.concat(record), index: state.index + 1} )
            );
        }
    }

    componentWillUnmount(index) {
        this.setState( 
            (state) => (state.records[index].deleted = true)
        );
    }

    set_done = (index) => {
        if (this.state.records[index].done === true) {
            this.setState( (state) => (state.records[index].done = false) );
        }
        else {
            this.setState( (state) => (state.records[index].done = true) );
        }
    }

    set_style = (i) => {
        if (this.state.records[i].done === true) {
            return "todo-app__item-detail todo_is_done"
        }
        return "todo-app__item-detail"
    }

    set_footer = () => {
        if (this.state.records.filter( e=>(e.deleted === false) ).length === 0) {
            return "none"
        }
        return "flex"
    }

    filter = (status) => {
        if (status === 'all') {
            return this.state.records.filter( e => e.deleted === false )
        }
        else if (status === 'active'){
            return this.state.records.filter( e => e.deleted === false && e.done === false)
        }
        else if (status === 'completed'){
            return this.state.records.filter( e => e.deleted === false && e.done === true)
        }
    }

    count_left = () => {
        this.setState( 
            (state) => state.cnt = state.records.filter(e => (e.done === false && e.deleted === false)).length)
    }

    render () {
        return (
            <section class="todo-app__main">
                <h1> TODO </h1>
                <Input onKeyDown={this.update_records} value={this.state.text}
                       onChange={ (event) => this.setState({text: event.target.value}) } 
                />

                <ul class ="todo-app__list" id="todo-list"> {
                    this.filter(this.state.status).map( 
                        (todo) => <Todo text={ todo.text } index={ todo.index } 
                                        remove_item={ () => {this.componentWillUnmount(todo.index)} } 
                                        set_done={ () => { this.set_done(todo.index) } }
                                        className={ this.set_style(todo.index) }
                                        checked={ this.state.records[todo.index].done } />
                    )
                }</ul>

                <Footer 
                    cnt={ this.state.records.filter( e => (e.done===false && e.deleted===false)).length }
                    footer={ this.set_footer() }
                    filter_all={ () => this.setState({status: "all"}) }
                    filter_active={ () => this.setState({status: "active"}) }
                    filter_completed={ () => this.setState({status: "completed"}) }
                    clear_completed={ () => this.state.records.filter( 
                        e => (e.done === true && e.deleted === false)).forEach( 
                            e => this.setState( () => (e["deleted"] = true) )
                        ) 
                    } 
                />
            </section>
        );
    }
}

export default App;
