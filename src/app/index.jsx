import React from 'react';
import ReactDOM, { render } from 'react-dom';

import { App } from './app.jsx';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
                <App />
        );
    }
}

ReactDOM.render(<Index />,
    document.getElementById('root')
);