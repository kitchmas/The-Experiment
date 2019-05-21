import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import '@firebase/firestore';
import App from './components/app.jsx';

var config = {
    apiKey: "AIzaSyA8mVCkMzuFtN3lzwSD6GT20v9JA0AzY-s",
    authDomain: "thomas-kitch.firebaseapp.com",
    databaseURL: "https://thomas-kitch.firebaseio.com",
    projectId: "thomas-kitch",
    storageBucket: "thomas-kitch.appspot.com",
    messagingSenderId: "459661569279"
};
firebase.initializeApp(config);


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