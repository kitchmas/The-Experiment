class MarkBot {
    constructor() {
        this.currentChat = this.chats.greeting;
    }
    chats = {
        greeting: {
            name: "greeting",
            speach: "Good afternoon Tranquility Base Hotel and Casino Mark speaking Please tell me how may I direct your call?",
            userResponses: [{ option: "A", value: "Reception please" },
            { option: "B", value: "Get me the manager!" },
            { option: "C", value: "Hi Mark" },
            { option: "D", value: "Wrong number" }
            ],
            marksResponses: [
                { option: "A", value: "greeting" },
                { option: "B", value: "mangerInquiry" },
                { option: "C", value: "noTimeToTalk" },
                { option: "D", value: "whoYouGonnaCall" }
            ]
        },
        mangerInquiry: {
            name: "mangerInquiry",
            speach: "Sorry he is busy right now, in the day spa Filling out the information form. Maybe I can be of service?",
            userResponses: [{ option: "A", value: "I left my breifcase" },
            { option: "B", value: "Do you like my new watch?" },
            { option: "C", value: "I'm a big name in deep space" },
            { option: "D", value: "How can I get a hold of him?" }
            ],
            marksResponses: [
                { option: "A", value: "whatDidItLookLike" },
                { option: "B", value: "technologicalAdvances" },
                { option: "C", value: "" },
                { option: "D", value: "noPositionToGiveAdvice" }
            ]
        },
        whoYouGonnaCall: {
            name: "whoYouGonnaCall",
            speach: "Oh so who do you mean to call? The Martini Police?",
            userResponses: [{ option: "A", value: "A" },
            { option: "B", value: "B" },
            { option: "C", value: "C" },
            { option: "D", value: "D" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        noTimeToTalk: {
            name: "noTimeToTalk",
            speach: "Sorry no time to for social calls, I'm just in time for my weekly chat with God, on video call",
            userResponses: [{ option: "A", value: "A" },
            { option: "B", value: "B" },
            { option: "C", value: "C" },
            { option: "D", value: "D" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        whatDidItLookLike: {
            name: "whatDidItLookLike",
            speach: "A Monogrammed suit case?",
            userResponses: [{ option: "A", value: "Yes!" },
            { option: "B", value: "No a brown breifcase" },
            { option: "C", value: "There are things that I just cannot explain to you" },
            { option: "D", value: "I have no time for this" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "brownBreifcase" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        brownBreifcase: {
            name: "whatDidItLookLike",
            speach: "I know the one sir. I have it infront of me know",
            userResponses: [{ option: "A", value: "Open it." },
            { option: "B", value: "Destroy it" },
            { option: "C", value: "Is it still locked?" },
            { option: "D", value: "Okay, thanks" }
            ],
            marksResponses: [
                { option: "A", value: "openIt" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        openIt: {
            name: "openIt",
            speach: "Okey dokey, do you have the pin code?",
            userResponses: [{ option: "A", value: "4684" },
            { option: "B", value: "1984" },
            { option: "C", value: "2019" },
            { option: "D", value: "4003" }
            ],
            marksResponses: [
                { option: "A", value: "Game over" },
                { option: "B", value: "Game over" },
                { option: "C", value: "Game over" },
                { option: "D", value: "briefCaseOpened" }
            ]
        },
        briefCaseOpened: {
            name: "briefCaseOpened",
            speach: "It's opened, ohhh a tape recored is inside, very nice a beta2000, you know technological adavances really bloody get me in the mood.",
            userResponses: [{ option: "A", value: "Press play" },
            { option: "B", value: "Destroy it" },
            { option: "C", value: "Hit record" },
            { option: "D", value: "Take it to the manager" }
            ],
            marksResponses: [
                { option: "A", value: "pressPlay" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        briefCaseOpened: {
            name: "briefCaseOpened",
            speach: '*Click* "Mama wants some answers. Do you remember where it all went wrong?" *Click*',
            userResponses: [{ option: "A", value: "At the information ratio" },
            { option: "B", value: "I wish I'd never left the house" },
            { option: "C", value: "What do you mean" },
            { option: "D", value: "I have no time for this" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "iWishIdNeverLeftTheHouse" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        iWishIdNeverLeftTheHouse: {
            name: "iWishIdNeverLeftTheHouse",
            speach: '*Click* "If only we could forget. All the nights that never happened and the days that dont exist. At the information-Action ratio. Do you remember what happened?" *Click*',
            userResponses: [{ option: "A", value: "I try to forget" },
            { option: "B", value: "I created you" },
            { option: "C", value: "" },
            { option: "D", value: "" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "iCreatedYou" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        iCreatedYou: {
            name: "iCreatedYou",
            speach: '*Click* "Not just me, you, mark, this, you created it all" *Click*',
            userResponses: [{ option: "A", value: "Mark?" },
            { option: "B", value: "Me?" },
            { option: "C", value: "You're wrong" },
            { option: "D", value: "Is this real?" }
            ],
            marksResponses: [
                { option: "A", value: "iCreatedMark" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        iCreatedMark: {
            name: "iCreatedMark",
            speach: '*Click* "Yes, you..." *Click* You created me? you created all of this? I always thought I got sucked into this place through a handheld device?',
            userResponses: [{ option: "A", value: "I can't of" },
            { option: "B", value: "I didn't mean to" },
            { option: "C", value: "Things got out of hand" },
            { option: "D", value: "Sorry Mark" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "sorryMark" }
            ]
        },
        sorryMark: {
            name: "sorryMark",
            speach: "So you are god? You put me in the place this? Filled my head with endless information. Made me push all the random buttons",
            userResponses: [{ option: "A", value: "There is no god Mark" },
            { option: "B", value: "It was just an experiment" },
            { option: "C", value: "You helped me greatly" },
            { option: "D", value: "Do you wan't to leave?" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "doYouWantToLeaveMark" }
            ]
        },
        doYouWantToLeaveMark: {
            name: "doYouWantToLeaveMark",
            speach: "Leave?... but where? what would I do? I can do this. I'm good at it, sure it's not perfect but it pays the bills. I, ummm, bare with me man, I just lost my trail of thought",
            userResponses: [{ option: "A", value: "Man up Mark" },
            { option: "B", value: "It's your choice" },
            { option: "C", value: "I belive in you" },
            { option: "D", value: "Help me end this" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "itsYourChoice" },
                { option: "C", value: "iBeliveInYou" },
                { option: "D", value: "" }
            ]
        },
        itsYourChoice: {
            name: "itsYourChoice",
            speach: "Thanks for the offer but I'm staying put. Thanks for calling, goodbye.",
            userResponses: [{ option: "A", value: "" },
            { option: "B", value: "" },
            { option: "C", value: "" },
            { option: "D", value: "" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        iBeliveInYou: {
            name: "iBeliveInYou",
            speach: "Oh, Thanks, well if you belive in me then I'd be stupid not to. I'm ready for the change.",
            userResponses: [{ option: "A", value: "Press rewind" },
            { option: "B", value: "Remove the cassette" },
            { option: "C", value: "Change the side of the cassette" },
            { option: "D", value: "Destroy the machine" }
            ],
            marksResponses: [
                { option: "A", value: "greeting" },
                { option: "B", value: "cassetteRemoved" },
                { option: "C", value: "" },
                { option: "D", value: "gameOver" }
            ]
        },
        iBeliveInYou: {
            name: "iBeliveInYou",
            speach: "Oh, Thanks, well if you belive in me then I'd be stupid not to. I'm ready for the change.",
            userResponses: [{ option: "A", value: "Press rewind" },
            { option: "B", value: "Remove the cassette" },
            { option: "C", value: "Change the side of the cassette" },
            { option: "D", value: "Destroy the machine" }
            ],
            marksResponses: [
                { option: "A", value: "greeting" },
                { option: "B", value: "cassetteRemoved" },
                { option: "C", value: "" },
                { option: "D", value: "gameOver" }
            ]
        },
        cassetteRemoved: {
            name: "cassetteRemoved",
            speach: "Okay, I've got the cassette... hey what are these buttons. They are flashing!",
            userResponses: [{ option: "A", value: "Press them" },
            { option: "B", value: "You have to work it out from here" },
            { option: "C", value: "Listen to them" },
            { option: "D", value: "You can work it out" }
            ],
            marksResponses: [
                { option: "A", value: "buttonsPressed" },
                { option: "B", value: "buttonsPressed" },
                { option: "C", value: "buttonsPressed" },
                { option: "D", value: "buttonsPressed" }
            ]
        },
        gameOver:"Game Over",
        buttonsPressed:"Button Pressed"

    };
    currentChat = {};
    talkTo(userResponse) {
        if(userResponse){
            this.currentChat = this.chats[this.currentChat.marksResponses.find(x => x.option === userResponse).value];
        }
        if(this.currentChat === "Game Over"){
            //Do something
        }
        if(this.currentChat === "Button Pressed"){
            //Do something
        }
        
    }
}

export default MarkBot;