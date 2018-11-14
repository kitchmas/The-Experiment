import React from 'react';

import Phone from './phone.jsx';
import Mark from '../mark/mark.jsx';

import MarkBot from '../mark/Mark.js'

class VideoPhone extends React.Component {
    state = {
        ringing: false,
        onCall: false,
        speaking: false,
        voice: '',
        answers:[
            ] 
    }
    markBot = {}
    componentWillMount = () => {
        this.markBot = new MarkBot();
    }
    componentDidMount = () => {
        setTimeout(() => {
           this.ringing();
        }, 10);
    }
    ringing = () => {
        this.setState({
            ringing: true
        })
    }
    answerCall = () => {
        this.setState({
            ringing: false,
            onCall: true,
        })
        this.speak(this.markBot.currentChat.speach, 0);
    }
    hangUp = () => {
        this.setState({
            onCall: false,
        })
    }
    speak = (message, index) => {
        if (index < message.length) {

            if (!this.state.speaking) {
                this.setState({ speaking: true });
            }

            setTimeout(() => {
                this.setState((prev) => ({
                    voice: prev.voice += message[index++]
                }));

                this.speak(message, index)
            }, 10);
        }
        else {
            if (this.state.speaking) {
                this.setState({ speaking: false, answers:this.markBot.currentChat.userResponses});
            }
        }
    }
    answerSelected = (answer) =>{
        this.markBot.talkTo(answer);
        this.setState({
            voice:"",
            answers:[],
        }, () => {
            this.speak(this.markBot.currentChat.speach,0);
        });
        
    }
    render() {
        let caller = null;
        if (this.state.onCall) {
            caller = <Mark speaking={this.state.speaking} />
        }
        return (
            <div className="center-page-wrapper">
                <Phone ringing={this.state.ringing}
                       answerCall={this.answerCall} 
                       hangUp={this.hangUp}
                       voice={this.state.voice}
                       answers={this.state.answers}
                       onAnswerSelected={this.answerSelected}>
                    {caller}
                </Phone>
            </div>
        );
    }

}

export default VideoPhone