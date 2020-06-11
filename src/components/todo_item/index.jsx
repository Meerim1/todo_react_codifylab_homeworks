import * as React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import EditTodoItem from '../edit_todo_item'


function TodoItem({ item, onDelete, onClick, onUpdate }) {

    const [isTodoEditingMode, toggleEdditingMode] = React.useState(false);

    React.useEffect(() => {
        console.log('----65165')
      }, [item.id]); 
    


    return (
        <div className={['todo_item', item.isCompleted ? 'completed' : ''].join(' ')} onDoubleClick={onUpdate}>
            <input className='todo_item_checkbox' onClick={onClick} type='checkbox' />
            <div className='todo_item_content'>
                {
                    isTodoEditingMode ?
                        <EditTodoItem title={item.title} /> :
                        <p>
                            {item.title}
                        </p>
                }

            </div>
            <button onClick={onDelete} className='todo_item_btn'>delete</button>
        </div>
    );
}

TodoItem.propTypes = {
    onClick: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    item: PropTypes.object
};

export default TodoItem