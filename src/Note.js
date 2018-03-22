import React, { Component } from 'react'
import FaBeer from 'react-icons/lib/fa/beer'
import FaTrash from 'react-icons/lib/fa/trash'

class Note extends Component {
	constructor(props) {
		super(props)
		this.edit = this.edit.bind(this)
		this.remove = this.remove.bind(this)
	}
	edit() {
		console.log('edit')
	}

	remove() {
		console.log('remove')
	}

	render() {
		return (
				<div className="note">
					<p>Learn React</p>
					<span>
						<button id="edit" onClick={this.edit}><FaBeer /></button>
						<button id="remove" onClick={this.remove}><FaTrash /></button>
					</span>
				</div>
			)
	}
}

export default Note