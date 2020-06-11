import * as React from 'react'
import TodoItem from '../todo_item'
import './index.scss'
import { idGenerator } from '../../utils/helpers'

export default class TodoContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            todoList: [],
            show: 'ALL'
        }
    }

    onInputChanged = e => {
        const title = e.currentTarget.value
        this.setState(prevState => ({ ...prevState, value: title }))
    }

    onEnter = e => {
        if (e.key === 'Enter') {
            this.addNewTodo()
        }
    }

    addNewTodo = () => {
        if (!this.state.value.length) {
            return
        }

        const todo = {
            title: this.state.value,
            id: idGenerator(),
            isCompleted: false,
        }

        this.setState(prevState => (
            {
                ...prevState,
                todoList: [...this.state.todoList, todo],
                value: ''
            }))
    }

    toggleTodo = item => {
        item.isCompleted = !item.isCompleted
        this.setState(prevState => (
            { ...prevState }
        ))
    }

    deleteTodo = item => {
        this.setState(prevState => (
            {
                ...prevState,
                todoList: prevState.todoList.filter(todo => todo.id !== item.id)
            }
        ))
    }

    switchPaged = (status) => {
        this.setState(prevState => (
            {
                ...prevState,
                show: status
            }
        ))
    }

    clearCompleted = () => {
        const completedTodo = this.state.todoList.filter(todo => !todo.isCompleted)
        this.setState(prevState => (
            {
                ...prevState,
                todoList: prevState.todoList.filter(item => completedTodo.includes(item))
            }
        ))
    }

    onTodoTitleUpdated = item => {

    }


    renderTodoList = () => {
        if (this.state.show === 'ALL') {
            return this.state.todoList.map(item => this.renderTodoItem(item))
        } else if (this.state.show === 'ACTIVE') {
            return this.state.todoList.filter(item => !item.isCompleted).map(item => this.renderTodoItem(item))
        } else if (this.state.show === 'COMPLETED') {
            return this.state.todoList.filter(item => item.isCompleted).map(item => this.renderTodoItem(item))
        }
    }

    renderTodoItem = (item) => {
        return (
            <div key={item.id}>
                <TodoItem item={item} onClick={() => this.toggleTodo(item)} onAUpdate={() => null} onDelete={() => this.deleteTodo(item)} />
            </div>
        )
    }


    render() {
        const activeTodoCount = this.state.todoList.filter(item => !item.isCompleted).length

        return (
            <div className='todo_container'>
                <input className='todo_input' autoFocus onChange={this.onInputChanged} onKeyPress={this.onEnter} type='text' value={this.state.value} />
                <button className='todo_add_btn' onClick={this.addNewTodo}>Add</button>
                <div>
                    {
                        this.renderTodoList()
                    }
                </div>
                <div className={'footer_buttons_wrapper'}>
                    <div>
                        {
                            !!activeTodoCount &&
                            <span className={'active_items_count'}>{`${activeTodoCount} items left`}</span>
                        }
                    </div>
                    <div>
                        <button onClick={() => this.switchPaged('ALL')} className={['footer_button', this.state.show === 'ALL' ? 'active' : ''].join(' ')}>All</button>
                        <button onClick={() => this.switchPaged('ACTIVE')} className={['footer_button', this.state.show === 'ACTIVE' ? 'active' : ''].join(' ')}>Active</button>
                        <button onClick={() => this.switchPaged('COMPLETED')} className={['footer_button', this.state.show === 'COMPLETED' ? 'active' : ''].join(' ')}>Completed</button>
                    </div>
                    <div className={'clear_button_wrapper'}>
                        {
                            this.state.todoList.some(item => item.isCompleted === true) &&
                            <button onClick={this.clearCompleted} className={'footer_button'}>Clear Completed</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}