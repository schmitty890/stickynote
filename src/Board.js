import React, { Component } from 'react' // import react
import Note from './Note' // import note as we need the note on the board
import FaPlus from 'react-icons/lib/fa/plus' // import react icons

class Board extends Component {
	constructor(props) {
		super(props) // props passed in when you want to access this.props in constructor
		this.state = { // define the default state
			notes: [] // set notes to empty array, will populate in the add function
		}
		this.add = this.add.bind(this) // .bind(this) keeps this scoped correctly for these functions
		this.eachNote = this.eachNote.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.nextId = this.nextId.bind(this)
	}

	/**
	 * componentWillMount() is invoked just before mounting occurs.
	 * It is called before render(), therefore calling setState() synchronously in this method will not trigger an extra rendering.
	 * Generally, we recommend using the constructor() instead.
	 * Avoid introducing any side-effects or subscriptions in this method.
	 * For those use cases, use componentDidMount() instead.
	 * This is the only lifecycle hook called on server rendering.
	 */
	componentDidMount() {
		var self = this
		if(this.props.count) { // this.props.count is found in index.js, determines the count
			fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`) //fetch api call
				.then(response => response.json()) //convert the response to json
				.then(json => json[0] // take the first value?
								.split('. ') // split the first value at every period
								.forEach(sentence => self.add(sentence.substring(0, 25)))) // for each sentence, call the add function with the first 25 characters of the sentence
		}
	}

	add(text) {
		console.log(this);
		this.setState(prevState => ({ //prevState is a reference to the previous state. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from prevState and props
			notes: [
				...prevState.notes, 	// es6 spread operator, takes all of the notes in the previous state,
				{											//the adds on the new note with an id and the note
					id: this.nextId(), 	// increments the id
					note: text 					// note text
				}
			]
		}))
	}

	nextId() { // function that returns the unique id
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}

	update(newText, i) {
		console.log('updating item at index', i, newText)
		this.setState(prevState => ({ //prevState is a reference to the previous state. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from prevState and props
			notes: prevState.notes.map(
				note => (note.id !== i) ? note : {...note, note: newText}
			)
		}))
	}

	remove(id) {
		console.log('removing item at', id)
		this.setState(prevState => ({ //prevState is a reference to the previous state. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from prevState and props
			notes: prevState.notes.filter(note => note.id !== id)
		}))
	}

	eachNote(note, i) {
		return (
			<Note key={note.id}
				  index={note.id}
				  onChange={this.update}
				  onRemove={this.remove}>
				  {note.note}
	    </Note>
		)
	}

	render() {
		return (
			<div className="board">
				{this.state.notes.map(this.eachNote)}
				<button onClick={this.add.bind(null, "New Note")}
						id="add">
					<FaPlus />
				</button>
				{}
			</div>
		)
	}
}

export default Board