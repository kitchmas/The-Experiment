import React from 'react';
import '../../../content/css/phone.css';

const Phone = (props) => {
    return (
        <div className="video-phone">
            <div className="call-section">
                <div className={props.ringing ? "screen ringing" : "screen"}>
                    {props.children}
                    {props.voice.length > 0 && <div className="caller-voice-wrapper">
                        <div className="caller-box-voice">
                            {props.voice}
                        </div>
                    </div>}
                </div>
                <div className="call-buttons-wrapper">
                    <div onClick={() => props.answerCall()} className={props.ringing ? "call-button answer ringing" : "call-button answer"}></div>
                    <div onClick={() => props.hangUp()} className="call-button hang-up"></div>
                </div>
            </div>
            <div className="answer-section">
                {props.answers && props.answers.length === 4 ? <div className="answer-buttons">
                    <div onClick={() => props.onAnswerSelected(props.answers[0].option)} className="answer-button">{props.answers[0].value}</div>
                    <div onClick={() => props.onAnswerSelected(props.answers[1].option)} className="answer-button">{props.answers[1].value}</div>
                    <div onClick={() => props.onAnswerSelected(props.answers[2].option)} className="answer-button">{props.answers[2].value}</div>
                    <div onClick={() => props.onAnswerSelected(props.answers[3].option)} className="answer-button">{props.answers[3].value}</div>
                </div> : <div className="answer-buttons">
                        <div className="answer-button"></div>
                        <div className="answer-button"></div>
                        <div className="answer-button"></div>
                        <div className="answer-button"></div>
                    </div>}

            </div>
        </div>
    );
}

export default Phone