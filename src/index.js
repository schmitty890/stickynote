import React from 'react' // we need react
import ReactDOM from 'react-dom' // we need react-dom
import './index.css' // we need the css file
import Board from './Board' // we need the Board
import registerServiceWorker from './registerServiceWorker' 

ReactDOM.render(<Board />, document.getElementById('root')) // render the Board component to the root id
registerServiceWorker()
