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
		this.randomBetween = this.randomBetween.bind(this)
	}

	componentWillMount() {
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 150, 'px'),
			top: this.randomBetween(0, window.innerHeight - 150, 'px'),
			transfor: `rotate(${this.randomBetween(-25, 25, 'deg')})`
		}
	}

	randomBetween(x, y, s) {
		return x + Math.ceil(Math.random() * (y - x)) + s
	}

	edit() {
		console.log('edit')
		this.setState({
			editing: true
		})
	}

	save(e) {
		e.preventDefault()
		this.props.onChange(this._newText.value, this.props.index)
		this.setState({
			editing: false
		})
	}

	renderForm() {
		return (
				<div className="note" style={this.style}>
					<form onSubmit={this.save}>
						<textarea ref={input => this._newText = input}/>
						<button id="save">save</button>
					</form>
				</div>
			)
	}

	remove() {
		console.log('removeing note')
		this.props.onRemove(this.props.index)
	}

	renderDisplay() {
		return (
				<div className="note" style={this.style}>
					<p>{this.props.children}</p>
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