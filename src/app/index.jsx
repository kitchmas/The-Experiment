import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.jsx';

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