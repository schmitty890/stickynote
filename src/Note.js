import React, { Component } from 'react'
import FaBeer from 'react-icons/lib/fa/beer'
import FaTrash from 'react-icons/lib/fa/trash'

class Note extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false
		}
		this.edit = this.edit.bind(this)
		this.remove = this.remove.bind(this)
		this.save = this.save.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
	}

	edit() {
		console.log('edit')
		this.setState({
			editing: true
		})
	}

	save() {
		console.log('save')
		console.log(this._newText.value)
	}

	renderForm() {
		return (
				<div className="note">
					<form>
						<textarea ref={input => this._newText = input}/>
						<button id="save" onClick={this.save}>save</button>
					</form>
				</div>
			)
	}

	remove() {
		console.log('remove')
	}

	renderDisplay() {
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

	render() {
		return this.state.editing ? this.renderForm() : this.renderDisplay()
	}
}

export default Note