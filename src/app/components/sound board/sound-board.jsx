import React from 'react';

import url from '../../../content/audio/Doubtfire/crazy-to-make-a-deal.mp3';

import Ahh from '../../../content/audio/Doubtfire/ahhh.mp3';
import CrazyToMakeADeal from '../../../content/audio/Doubtfire/crazy-to-make-a-deal.mp3';
import DontMakeMeSmackYou from '../../../content/audio/Doubtfire/dont-make-me-smack.mp3';
import Figaro from '../../../content/audio/Doubtfire/figaro.mp3';
import GetTheHose from '../../../content/audio/Doubtfire/get-the-hose.mp3';
import Hello from '../../../content/audio/Doubtfire/hello.mp3';
import HELLOO from '../../../content/audio/Doubtfire/HELLOOOO.mp3';
import HelpIsOnTheWay from '../../../content/audio/Doubtfire/help-is-on-the-way.mp3';
import IAmJob from '../../../content/audio/Doubtfire/i-am-job.mp3';
import IAmJob2 from '../../../content/audio/Doubtfire/i-am-job-2.mp3';
import IKilledTheBastard from '../../../content/audio/Doubtfire/killed-the-bastard.mp3';
import IUsedToBeOne from '../../../content/audio/Doubtfire/used-to-be-one.mp3';
import GetInYourCell from '../../../content/audio/Doubtfire/in-your-cell.mp3'
import ThatsTheformaldehyde from '../../../content/audio/Doubtfire/formaldehyde.mp3';
import ThenIveGotTodo from '../../../content/audio/Doubtfire/got-to-do.mp3';
import HappyToBeInAmerica from '../../../content/audio/Doubtfire/happy-to-be-in.mp3';
import IWantYouInTheWorstWay from '../../../content/audio/Doubtfire/i-want-you-in-the.mp3';
import ThisIdiot from '../../../content/audio/Doubtfire/this-idiot.mp3';
import ImSittingOnAGoldMine from '../../../content/audio/Doubtfire/im-sitting-on-a.mp3';
import LookAtMeMoneyPenny from '../../../content/audio/Doubtfire/look-at-me-money.mp3';
import LookingForSignsOfInteligentLife from '../../../content/audio/Doubtfire/looking-for-inteligent-life.mp3';
import OHShit from '../../../content/audio/Doubtfire/oh-shit.mp3';
import PissOfLou from '../../../content/audio/Doubtfire/piss-off-lou.mp3';
import Yessss from '../../../content/audio/Doubtfire/yes.mp3';


import AllRightFine from '../../../content/audio/The Grinch/alright-fine.mp3';
import DownASizeAndAHalf from '../../../content/audio/The Grinch/down-a-size.mp3';
import ImJustEating from '../../../content/audio/The Grinch/eating-because-bored.mp3';
import GetMyCloak from '../../../content/audio/The Grinch/get-my-cloak.mp3';
import GiveMeThat from '../../../content/audio/The Grinch/give-me-that.mp3';
import WellYouBetterGoCatchIt from '../../../content/audio/The Grinch/go-catch-it.mp3';
import ImAnIdiot2 from '../../../content/audio/The Grinch/im-an-idiot-2.mp3';
import ImAnIdiot from '../../../content/audio/The Grinch/im-an-idiot.mp3';
import YourAnIdiot2 from '../../../content/audio/The Grinch/your-an-idiot-2.mp3';
import YourAnIdiot from '../../../content/audio/The Grinch/your-an-idiot.mp3';
import ItsFantastic from '../../../content/audio/The Grinch/its-fantastic.mp3';
import Max from '../../../content/audio/The Grinch/max.mp3';
import OhGoodie from '../../../content/audio/The Grinch/oh-goodie.mp3';
import HaThatsAGoodOne from '../../../content/audio/The Grinch/ohh-thas-a-good-one.mp3';
import ThatsReallyMature from '../../../content/audio/The Grinch/really-mature.mp3';
import ICouldUseSomeSocial from '../../../content/audio/The Grinch/social-interaction.mp3';
import TakeThings from '../../../content/audio/The Grinch/take-things.mp3';
import SoWannaGetToKnowMe from '../../../content/audio/The Grinch/wannaa-get-to-know-me.mp3';
import WildAnimal from '../../../content/audio/The Grinch/wild-animal.mp3';



import '../../../content/css/sound-board.css';

import CategorySelector from './category-selector.jsx';
import SoundBitesBox from './sound-bites-box.jsx';

class SoundBoard extends React.Component {
    constructor(props) {
        super(props);
        this.audio = new Audio(url);
    }
    state = {
        playingAudioId: null,
        categorys: [
            { id: 1, name: "Mrs. Doubtfire" },
            { id: 2, name: "The Grinch" }
        ],
        soundBites: [
            { id: 25, categoryId: 1, name: "Ahhhhh", path: Ahh },
            { id: 1, categoryId: 1, name: "Get in your cell", path: GetInYourCell },
            { id: 2, categoryId: 1, name: "Don't make me get the hose", path: GetTheHose },
            { id: 4, categoryId: 1, name: "Crazy to make a deal", path: CrazyToMakeADeal },
            { id: 5, categoryId: 1, name: "Don't make me smack you", path: DontMakeMeSmackYou },
            { id: 6, categoryId: 1, name: "Figaro", path: Figaro },
            { id: 7, categoryId: 1, name: "Hello", path: Hello },
            { id: 8, categoryId: 1, name: "HELLOOO", path: HELLOO },
            { id: 9, categoryId: 1, name: "Help is on the way", path: HelpIsOnTheWay },
            { id: 10, categoryId: 1, name: "I am job", path: IAmJob },
            { id: 11, categoryId: 1, name: "I am job 2", path: IAmJob2 },
            { id: 12, categoryId: 1, name: "I killed the bastard", path: IKilledTheBastard },
            { id: 13, categoryId: 1, name: "I used to be one", path: IUsedToBeOne },
            { id: 14, categoryId: 1, name: "That's the formaldehyde", path: ThatsTheformaldehyde },
            { id: 15, categoryId: 1, name: "Then I've got todo", path: ThenIveGotTodo },
            { id: 16, categoryId: 1, name: "Happy to be in America", path: HappyToBeInAmerica },
            { id: 17, categoryId: 1, name: "I want you in the worst way", path: IWantYouInTheWorstWay },
            { id: 18, categoryId: 1, name: "This idiot", path: ThisIdiot },
            { id: 19, categoryId: 1, name: "I'm sitting on a gold mine", path: ImSittingOnAGoldMine },
            { id: 20, categoryId: 1, name: "Look at me money penny", path: LookAtMeMoneyPenny },
            { id: 21, categoryId: 1, name: "Looking for signs of inteligent life", path: LookingForSignsOfInteligentLife },
            { id: 22, categoryId: 1, name: "Ohh shit", path: OHShit },
            { id: 23, categoryId: 1, name: "Piss of Lou", path: PissOfLou },
            { id: 24, categoryId: 1, name: "Yessss", path: Yessss },
            { id: 26, categoryId: 2, name: "All Right  Fine", path: AllRightFine },
            { id: 27, categoryId: 2, name: "Down a size and a half", path: DownASizeAndAHalf },
            { id: 28, categoryId: 2, name: "Give me that", path: GiveMeThat },
            { id: 29, categoryId: 2, name: "Get my cloak", path: GetMyCloak },
            { id: 30, categoryId: 2, name: "Ha! that's a good one", path: HaThatsAGoodOne },
            { id: 31, categoryId: 2, name: "I'm just eating because I'm bored", path: ImJustEating },
            { id: 32, categoryId: 2, name: "I'm an idiot", path: ImAnIdiot },
            { id: 33, categoryId: 2, name: "I'm an idiot 2", path: ImAnIdiot2 },
            { id: 34, categoryId: 2, name: "You're and idiot", path: YourAnIdiot },
            { id: 35, categoryId: 2, name: "You're and idiot", path: YourAnIdiot2 },
            { id: 36, categoryId: 2, name: "It's fantastic", path: ItsFantastic },
            { id: 37, categoryId: 2, name: "I could use some social interaction", path: ICouldUseSomeSocial },
            { id: 38, categoryId: 2, name: "Max!", path: Max },
            { id: 39, categoryId: 2, name: "Oh goodie", path: OhGoodie },
            { id: 40, categoryId: 2, name: "So they wanna get to know me", path: SoWannaGetToKnowMe },
            { id: 41, categoryId: 2, name: "That's really mature", path: ThatsReallyMature },
            { id: 42, categoryId: 2, name: "Take things", path: TakeThings },
            { id: 43, categoryId: 2, name: "Well you better go catch it", path: WellYouBetterGoCatchIt },
            { id: 44, categoryId: 2, name: "Are you some sort of wild animal", path: WildAnimal },
          
        ],
        selectedCategory: { id: 0, name: "" }
    }
    componentDidMount() {
        this.setState({ selectedCategory: this.state.categorys[0] })
    }
    _play = (id) => {
        let soundBiteToPlay,
            audio = this.audio;
        if (id !== this.state.playingAudioId) {
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