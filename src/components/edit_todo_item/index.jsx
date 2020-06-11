import * as React from 'react'
import PropTypes from 'prop-types'

export default class EditTodoItem extends React.Component {
    render() {
        console.log('------', this.props.title)

        return (
            <div>
                <input type='text' value={this.props.title} onChange={() => null}/>
            </div>
        )
    }
}

EditTodoItem.propTypes = {
    title: PropTypes.string
};