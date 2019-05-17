import React from 'react';

import url from '../../../content/audio/Doubtfire/crazy-to-make-a-deal.mp3';

import CrazyToMakeADeal from '../../../content/audio/Doubtfire/crazy-to-make-a-deal.mp3';
import DontMakeMeSmackYou from '../../../content/audio/Doubtfire/dont-make-me-smack.mp3';
import Figaro from '../../../content/audio/Doubtfire/figaro.mp3';
import ThatsTheformaldehyde from '../../../content/audio/Doubtfire/formaldehyde.mp3';
import ThenIveGotTodo from '../../../content/audio/Doubtfire/got-to-do.mp3';
import HappyToBeInAmerica from '../../../content/audio/Doubtfire/happy-to-be-in.mp3';
import IWantYouInTheWorstWay from '../../../content/audio/Doubtfire/i-want-you-in-the.mp3';
import ThisIdiot from '../../../content/audio/Doubtfire/this-idiot.mp3';
import ImSittingOnAGoldMine from '../../../content/audio/Doubtfire/im-sitting-on-a.mp3';
import LookAtMeMoneyPenny from '../../../content/audio/Doubtfire/look-at-me-money.mp3';
import LookingForSignsOfInteligentLife from '../../../content/audio/Doubtfire/looking-for-inteligent-life.mp3';
import PissOfLou from '../../../content/audio/Doubtfire/piss-off-lou.mp3';
import Yessss from '../../../content/audio/Doubtfire/yes.mp3';
import DoYouConsiderYourself from '../../../content/audio/Doubtfire/do-you-consider-humours.mp3';
import DoYouConsiderYourself2 from '../../../content/audio/Doubtfire/do-you-consider-yourself.mp3';

import '../../../content/css/sound-board.css';

import CategorySelector from './category-selector.jsx';
import SoundBitesBox from './sound-bites-box.jsx';

class SoundBoard extends React.Component {
    constructor(props) {
        super(props);
        this.audio = new Audio(url);
    }
    state = {
        playingAudioId:null,
        categorys: [
            { id: 1, name: "Mrs. Doubtfire" },
            { id: 2, name: "Empty Placeholder 1" },
            { id: 3, name: "Empty Placeholder 2" }
        ],
        soundBites: [
            { id: 1, categoryId: 1, name: "Crazy to make a deal", path: CrazyToMakeADeal },
            { id: 2, categoryId: 1, name: "Don't make me smack you", path: DontMakeMeSmackYou },
            { id: 3, categoryId: 1, name: "Figaro", path: Figaro },
            { id: 4, categoryId: 1, name: "That's the formaldehyde", path: ThatsTheformaldehyde },
            { id: 5, categoryId: 1, name: "Then I've got todo", path: ThenIveGotTodo },
            { id: 6, categoryId: 1, name: "Happy to be in America", path: HappyToBeInAmerica },
            { id: 7, categoryId: 1, name: "I want you in the worst way", path: IWantYouInTheWorstWay },
            { id: 8, categoryId: 1, name: "This idiot", path: ThisIdiot },
            { id: 9, categoryId: 1, name: "I'm sitting on a gold mine", path: ImSittingOnAGoldMine },
            { id: 10, categoryId: 1, name: "Look at me money penny", path: LookAtMeMoneyPenny },
            { id: 11, categoryId: 1, name: "Looking for signs of inteligent life", path: LookingForSignsOfInteligentLife },
            { id: 12, categoryId: 1, name: "Piss of Lou", path: PissOfLou },
            { id: 13, categoryId: 1, name: "Yessss", path: Yessss },
            { id: 14, categoryId: 1, name: "Do you consider yourself", path: DoYouConsiderYourself },
            { id: 15, categoryId: 1, name: "Do you consider yourself 2", path: DoYouConsiderYourself2 },
        ],
        selectedCategory: { id: 0, name: "" }
    }
    componentDidMount() {
        this.setState({ selectedCategory: this.state.categorys[0] })
    }
    _play = (id) => {
        let soundBiteToPlay,
        audio = this.audio;
        if(id !== this.state.playingAudioId){
            this.setState({ playingAudioId: id })
             soundBiteToPlay = this.state.soundBites.find(soundBite => {
                return soundBite.id === id
            }),
            audio.src = soundBiteToPlay.path;
        }
    
        audio.currentTime = 0;
        audio.play();

        this.playTimer = setInterval(
            () => {
                if (audio.paused) {
                    clearInterval(this.playTimer);
                    this.setState({ playingAudioId: null });
                } 
            },
            100
          );
    }
    pause = () => {
        this.audio.pause();
    }
    getSelectedSoundBites = () => {
        return this.state.soundBites.filter(soundBite => {
            return soundBite.categoryId === this.state.selectedCategory.id;
        });
    }
    _categoryChanged = (id) => {
        var selectedCategory = this.state.categorys.find(category => {
            return category.id === id
        });

        this.setState({ selectedCategory })
    }
    render() {
        return (
            <div className="page content-wrapper">
                <div className="sound-bite-container">
                        <CategorySelector categorys={this.state.categorys}
                            onChange={this._categoryChanged}
                            selectedCategory={this.state.selectedCategory} />
                        <SoundBitesBox
                        playingAudioId={this.state.playingAudioId}
                        soundBites={this.getSelectedSoundBites()}
                            play={this._play} />
                </div>
            </div>
        );
    }
}

export default SoundBoard