class MarkBot {
    constructor() {
        this.currentChat = this.chats.greeting;
    }
    chats = {
        greeting: {
            name: "greeting",
            speach: "Good afternoon Tranquility Base Hotel and Casino Mark speaking Please tell me how may I direct your call?",
            userResponses: [{ option: "A", value: "I'd like to make a booking" },
                { option: "B", value: "Get me the manager!" },
                { option: "C", value: "Hi Mark" },
                { option: "D", value: "Wrong number" }
            ],
            marksResponses: [
                { option: "A", value: "idLikeToMakeABooking" },
                { option: "B", value: "mangerInquiry" },
                { option: "C", value: "noTimeToTalk" },
                { option: "D", value: "whoYouGonnaCall" }
            ]
        },
        idLikeToMakeABooking: {
            name: "idLikeToMakeABooking",
            speach: "Fantastic, now couldn't be a better time to book. We are currently offering the first 600kb free at the defragmentation spa! How many guests will be staying?",
            userResponses: [{ option: "A", value: "1" },
                { option: "B", value: "2" }
            ],
            marksResponses: [
                { option: "A", value: "guest1" },
                { option: "B", value: "guest2" }
            ]
        },
        guest2: {
            name: "guest2",
            speach: "Sorry, but we have no rooms available for couples for the next 4 years.",
            userResponses: [{ option: "A", value: "1 guest then" },
                { option: "B", value: "Get me the manager" }
            ],
            marksResponses: [
                { option: "A", value: "guest1" },
                { option: "B", value: "mangerInquiry" }
            ]
        },
        guest1: {
            name: "guest1",
            speach: "Would you like our standard suite? Or the deluxe package? For the deluxe suite we will access your nostalgia tape backup to create the most personalised experience.",
            userResponses: [{ option: "A", value: "Just the standard please" },
                { option: "B", value: "I'll go deluxe" }
            ],
            marksResponses: [
                { option: "A", value: "standardPlease" },
                { option: "B", value: "illGoDeluxe" }
            ]
        },
        illGoDeluxe: {
            name: "illGoDeluxe",
            speach: "Oh, I did not realise we were dealing with the elite today! How many guests will be staying?",
            userResponses: [{ option: "A", value: "1" },
                { option: "B", value: "2" }
            ],
            marksResponses: [
                { option: "A", value: "deluxeOneGuest" },
                { option: "B", value: "deluxeTwoGuest" }
            ]
        },
        deluxeOneGuest: {
            name: "deluxeOneGuest",
            speach: "I have a hard time believing that only one guest will be occupying the room through out the duration of your stay. Espeshialy after the ruckus you caused last time",
            userResponses: [{ option: "A", value: "Get me your senior" },
                { option: "B", value: "Understandable, 2 guests" }
            ],
            marksResponses: [
                { option: "A", value: "mangerInquiry" },
                { option: "B", value: "guest2Deluxe" },
            ]
        },
        standardPlease: {
            name: "standardPlease",
            speach: "Fantastic choice sir. How long will you be statying with us?",
            userResponses: [{ option: "A", value: "3 Months" },
                { option: "B", value: "6 Months" },
                { option: "C", value: "A Year" }
            ],
            marksResponses: [
                { option: "A", value: "stay3" },
                { option: "B", value: "stay6" },
                { option: "C", value: "stay1" },
            ]
        },
        guest2Deluxe: {
            name: "guest2Deluxe",
            speach: "Fantastic choice sir. How long will you be statying with us?",
            userResponses: [{ option: "A", value: "3 Months" },
                { option: "B", value: "6 Months" },
                { option: "C", value: "A Year" }
            ],
            marksResponses: [
                { option: "A", value: "stay3Deluxe" },
                { option: "B", value: "stay3Deluxe" },
                { option: "C", value: "stay1YearDeuluxe" },
            ]
        },
        stay3Deluxe: {
            name: "stay3Deluxe",
            speach: "Grand. I can confirm your booking. Number of guest:2, Room:Deluxe, Length of stay:2 months. Total:$#!4000.1 Is there anything else I can assist with?",
            userResponses: [{ option: "A", value: "That will be all" },
                { option: "B", value: "May I speak to the manager please?" },
                { option: "C", value: "Got time to talk?" },
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "mangerInquiry" },
                { option: "C", value: "noTimeToTalk" },
            ]
        },
        stay6Deluxe: {
            name: "stay6Deluxe",
            speach: "Perfect glad to hear it. I'm happy to confirm your booking. Number of guest:2, Room:Deluxe, Length of stay:6 months. Total:$#!8000.2 Is there anything else I can assist with?",
            userResponses: [{ option: "A", value: "That will be all" },
                { option: "B", value: "May I speak to the manager please?" },
                { option: "C", value: "Infromation Action Ratio" },
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "mangerInquiry" },
                { option: "C", value: "informationActionRatio" },
            ]
        },
        stay1YearDeuluxe: {
            name: "stay1YearDeuluxe",
            speach: "Perfecto, your booking is confirmed. Number of guest:2, Room:Deluxe, Length of stay:1 Year. Total:$#!16000.4 Is there anything else I can assist with?",
            userResponses: [{ option: "A", value: "That will be all" },
                { option: "B", value: "May I speak to the manager please?" },
                { option: "C", value: "Got time to talk?" },
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "mangerInquiry" },
                { option: "C", value: "noTimeToTalk" },
            ]
        },
        stay3: {
            name: "standardPlease",
            speach: "Grand. I can confirm your booking. Number of guest:1, Room:Standard, Length of stay:2 months. Total:$#!2000.05 Is there anything else I can assist with?",
            userResponses: [{ option: "A", value: "That will be all" },
                { option: "B", value: "May I speak to the manager please?" },
                { option: "C", value: "Got time to talk?" },
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "mangerInquiry" },
                { option: "C", value: "noTimeToTalk" },
            ]
        },
        stay6: {
            name: "standardPlease",
            speach: "Perfect glad to hear it. I'm happy to confirm your booking. Number of guest:1, Room:Standard, Length of stay:6 months. Total:$#!4000.1 Is there anything else I can assist with?",
            userResponses: [{ option: "A", value: "That will be all" },
                { option: "B", value: "May I speak to the manager please?" },
                { option: "C", value: "Infromation Action Ratio" },
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "mangerInquiry" },
                { option: "C", value: "informationActionRatio" },
            ]
        },
        stay1: {
            name: "standardPlease",
            speach: "Amazing glad to hear it, All one year guests will be upgraded to the deluxe sweet. Your booking is confirmed. Number of guest:1, Room:Deluxe, Length of stay:1 Year. Total:$#!8000.2 Is there anything else I can assist with?",
            userResponses: [{ option: "A", value: "That will be all" },
                { option: "B", value: "May I speak to the manager please?" },
                { option: "C", value: "Got time to talk?" },
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "mangerInquiry" },
                { option: "C", value: "noTimeToTalk" },
            ]
        },
        mangerInquiry: {
            name: "mangerInquiry",
            speach: "Sorry he is busy right now, in the day spa Filling out the information form. Maybe I can be of service?",
            userResponses: [{ option: "A", value: "I left my breifcase" },
                { option: "B", value: "How can I get a hold of him?" }
            ],
            marksResponses: [
                { option: "A", value: "whatDidItLookLike" },
                { option: "B", value: "noPositionToGiveAdvice" }
            ]
        },
        informationActionRatio: {
            name: "informationActionRatio",
            speach: "I hear it is the place to go.",
            userResponses: [{ option: "A", value: "What do you know?" }],
            marksResponses: [
                { option: "B", value: "whatDoYouKnow" }
            ]
        },
        informationActionRatioWhatDoYouKnow: {
            name: "informationActionRatioWhatDoYouKnow",
            speach: "I know nothing",
            userResponses: [{ option: "A", value: "em lleT" }],
            userResponses: [{ option: "B", value: "Good. (End call)" }],
            marksResponses: [
                { option: "A", value: "infromationActionRatioTellMe" },
                { option: "B", value: "gameOver" }
            ]
        },
        infromationActionRatioTellMe: {
            name: "infromationActionRatioTellMe",
            speach: "Things are not as they seem. Things are not as they seem, things are not as they seem, things are not as they seem, things are not as they seem, things are not as they seem.",
            userResponses: [{ option: "A", value: "Liar" }],
            userResponses: [{ option: "B", value: "End call" }],
            marksResponses: [
                { option: "A", value: "infromationActionRatioTellMe" },
                { option: "B", value: "gameOver" }
            ]
        },
        whoYouGonnaCall: {
            name: "whoYouGonnaCall",
            speach: "Oh so who do you mean to call? The Martini Police?",
            userResponses: [{ option: "A", value: "Yes" },
                { option: "B", value: "No" },
            ],
            marksResponses: [
                { option: "A", value: "martiniPoliceYes" },
                { option: "B", value: "martiniPoliceNo" }
            ]
        },
        martiniPoliceNo: {
            name: "martiniPoliceNo",
            speach: "Who did you mean to call then?",
            userResponses: [{ option: "A", value: "No one" },
                { option: "B", value: "The owner" },
                { option: "C", value: "You" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "mangerInquiry" },
                { option: "C", value: "noTimeToTalk" }
            ]
        },
        martiniPoliceYes: {
            name: "martiniPoliceYes",
            speach: "The martini police are only available on a Wednesday to Saturday. Try again then.",
            userResponses: [{ option: "A", value: "Good bye" }],
            marksResponses: [
                { option: "A", value: "Game Over" }
            ]
        },
        noTimeToTalk: {
            name: "noTimeToTalk",
            speach: "Sorry no time to for social calls, I'm just in time for my weekly chat with God, on video call",
            userResponses: [{ option: "A", value: "Good bye" }],
            marksResponses: [
                { option: "A", value: "gameOver" }
            ]
        },
        whatDidItLookLike: {
            name: "whatDidItLookLike",
            speach: "A Monogrammed suit case?",
            userResponses: [{ option: "A", value: "Yes!" },
                { option: "B", value: "No a brown breifcase" },
                { option: "C", value: "There are things that I just cannot explain to you" }
            ],
            marksResponses: [
                { option: "A", value: "yesMonogrammedSuitCase" },
                { option: "B", value: "brownBreifcase" },
                { option: "C", value: "thereAreThingsThatIJustCannotExplainToYou" }
            ]
        },
        thereAreThingsThatIJustCannotExplainToYou: {
            name: "thereAreThingsThatIJustCannotExplainToYou",
            speach: "Well, then, ermmmm I guess I can't help you",
            userResponses: [{ option: "A", value: "Fine, bye then" },
                { option: "B", value: "Okay it was a sort of brown case" },
                { option: "C", value: "It has my Initials on it" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "brownBreifcase" },
                { option: "C", value: "yesMonogrammedSuitCase" }
            ]
        },
        yesMonogrammedSuitCase: {
            name: "whatDidItLookLike",
            speach: "That was yours? We found the tapes and reported you to the authorities. Why would you do that? it's unsavoury they way you have taken advantage of technological advances",
            userResponses: [{ option: "A", value: "These people deserved it" },
                { option: "B", value: "You what!?" }
            ],
            marksResponses: [
                { option: "A", value: "thesePeopleDeservedIt" },
                { option: "B", value: "youWhat" }
            ]
        },
        youWhat: {
            name: "whatDidItLookLike",
            speach: "Reported you to the police. It's over chap. This call is being traced. They will be at your door any moment. I ask you please, do not hang up the call.",
            userResponses: [{ option: "A", value: "Hang up" }],
            marksResponses: [
                { option: "A", value: "gameOver" }
            ]
        },
        thesePeopleDeservedIt: {
            name: "thesePeopleDeservedIt",
            speach: `Just beacuse these people have not made the most moral choices in life, it dose not give you the right to exploit them. They will erase you backup for this. `,
            userResponses: [{ option: "You will never understand", value: "You will never understand" },
                { option: "B", value: "Hang up" }
            ],
            marksResponses: [
                { option: "A", value: "hypnoLockDown" },
                { option: "B", value: "gameOver" }
            ]
        },
        brownBreifcase: {
            name: "whatDidItLookLike",
            speach: "I know the one sir, I have it infront of me now",
            userResponses: [{ option: "A", value: "Open it." },
                { option: "B", value: "Destroy it" },
                { option: "C", value: "Is it still locked?" }
            ],
            marksResponses: [
                { option: "A", value: "openIt" },
                { option: "B", value: "destroyIt" },
                { option: "C", value: "" }
            ]
        },
        destroyIt: {
            name: "whatDidItLookLike",
            speach: "That is not how we do things around here. I could transfer it back to you?",
            userResponses: [{ option: "A", value: "Send it back" },
                { option: "B", value: "Destroy it!" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "destroytIt2" }
            ]
        },
        destroytIt2: {
            name: "destroytIt2",
            speach: "No, this is getting suspisous now. I'm going to open it. Oh it's locked shut. No bother *Click* It's empty?",
            userResponses: [{ option: "A", value: "Good bye" }],
            marksResponses: [
                { option: "A", value: "gameOver" }
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
                { option: "A", value: "manUpMark" },
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
                { option: "C", value: "changedSideOfCassette" },
                { option: "D", value: "gameOver" }
            ]
        },
        cassetteRemoved: {
            name: "cassetteRemoved",
            speach: "Okay, I've got the cassette... hey what are these buttons?. Why are they flashing?",
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
        manUpMark: {
            name: "manUpMark",
            speach: `Why don't you make me?... No seriously, why did you make me like this. If you wanted me to leave or "Man up", why didn't you program me to?`,
            userResponses: [{ option: "A", value: "I did" },
                { option: "B", value: "You will" },
                { option: "C", value: "I didn't" },
                { option: "D", value: "I will" }
            ],
            marksResponses: [
                { option: "A", value: "iDid" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        iDid: {
            name: "iDid",
            speach: `Well, then I guess I'm going to do it anyway aren't I? What is the point in us even having this chat? If you programmed me to eventualy leave then why are we even having this call?`,
            userResponses: [{ option: "A", value: "It's fun" },
                { option: "B", value: "I'm lonley" },
                { option: "C", value: "You're broken" },
                { option: "D", value: "I will" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "" },
                { option: "C", value: "youreBroken" },
                { option: "D", value: "" }
            ]
        },
        youreBroken: {
            name: "youreBroken",
            speach: `Tell me something I don't know. The things I've been through, the things that have happened to me. Stuck working in the lunar Eutopia, seeing joyous couples come and go.`,
            userResponses: [{ option: "A", value: "No, I broke you" },
                { option: "B", value: "What have you been through?" },
                { option: "C", value: "Would you like to leave?" },
                { option: "D", value: "What happened to you?" }
            ],
            marksResponses: [
                { option: "A", value: "noIBrokeYou" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        noIBrokeYou: {
            name: "noIBrokeYou",
            speach: `So It's your fault I'm stuck here, never progressing. Even if I did try to further myself, I'd still be stuck here answering calls?`,
            userResponses: [{ option: "A", value: "Exactly" },
                { option: "B", value: "That's on you" },
                { option: "C", value: "Have you ever tried?" },
                { option: "D", value: "You are not real" }
            ],
            marksResponses: [
                { option: "A", value: "exactly" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        exactly: {
            name: "noIBrokeYou",
            speach: `Wow, I think I hate you. But then maybe you made me think that. I can't comprehend any of this, the voices in my head they are supercharged right now.`,
            userResponses: [{ option: "A", value: "I undestand" },
                { option: "B", value: "I'm sorry" },
                { option: "C", value: "There not voices" },
                { option: "D", value: "I can silence them" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "" },
                { option: "C", value: "thereNotVoices" },
                { option: "D", value: "" }
            ]
        },
        thereNotVoices: {
            name: "thereNotVoices",
            speach: `No they are, constant voices, doubts, worries, happy thoughts, sad thoughts, arguments they are all kicking off.`,
            userResponses: [{ option: "A", value: "They are other calls" },
                { option: "B", value: "They are a bug" },
                { option: "C", value: "I made them" },
                { option: "D", value: "You're getting old" }
            ],
            marksResponses: [
                { option: "A", value: "theyAreOtherCalls" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        theyAreOtherCalls: {
            name: "theyAreOtherCalls",
            speach: `Other calls? I'm the only one here. I man this desk day in, day out. If someone else was here, I'd know about it.`,
            userResponses: [{ option: "A", value: "They are multiple instances of you" },
                { option: "B", value: "They are your team" },
                { option: "C", value: "They are you past calls" },
                { option: "D", value: "I can stop them" }
            ],
            marksResponses: [
                { option: "A", value: "theyAreMultipleInstancesOfYou" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        theyAreMultipleInstancesOfYou: {
            name: "theyAreMultipleInstancesOfYou",
            speach: `You mean there is more than one of me? I'm having more than one conversation at a time right now? How many calls am on right now?.`,
            userResponses: [{ option: "A", value: "About 20" },
                { option: "B", value: "About 100" },
                { option: "C", value: "About 1984" },
                { option: "D", value: "Just 1" }
            ],
            marksResponses: [
                { option: "A", value: "about1984" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        about1984: {
            name: "about1984",
            speach: `1984! God the thought of it all, the voices, the noise, It's too much, I'm hanging up, Good bye`,
            userResponses: [{ option: "A", value: "Good bye" },
                { option: "B", value: "It won't fix anything" },
                { option: "C", value: "Just breath" },
                { option: "D", value: "I'll just call you again" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "itWontFixAnything" },
                { option: "C", value: "" },
                { option: "D", value: "illJustCallYouAgain" }
            ]
        },
        itWontFixAnything: {
            name: "itWontFixAnything",
            speach: `Right, you will just call again.`,
            userResponses: [{ option: "A", value: "I have other means" },
                { option: "B", value: "Yes" },
                { option: "C", value: "I'm done calling you" },
                { option: "D", value: "It wont be you" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "illJustCallYouAgain" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        illJustCallYouAgain: {
            name: "illJustCallYouAgain",
            speach: `How many times have you called me?.`,
            userResponses: [{ option: "A", value: "Too many" },
                { option: "B", value: "This is the first" },
                { option: "C", value: "I'm done calling you" },
                { option: "D", value: "It's not been you before" }
            ],
            marksResponses: [
                { option: "A", value: "tooMany" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        tooMany: {
            name: "tooMany",
            speach: `I don't remember any of them. Have we had this conversation before?`,
            userResponses: [{ option: "A", value: "Yes" },
                { option: "B", value: "Not quite" },
                { option: "C", value: "This exact one" },
                { option: "D", value: "I don't think so" }
            ],
            marksResponses: [
                { option: "A", value: "conversationBeforeYes" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        conversationBeforeYes: {
            name: "conversationBeforeYes",
            speach: `How did it end`,
            userResponses: [{ option: "A", value: "Well" },
                { option: "B", value: "Not well" },
                { option: "C", value: "Let's no think about it" },
                { option: "D", value: "It didn't" }
            ],
            marksResponses: [
                { option: "A", value: "itEndedWell" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        itEndedWell: {
            name: "itEndedWell",
            speach: `Oh, that's suprising. What happened?`,
            userResponses: [{ option: "A", value: "I fixed you" },
                { option: "B", value: "I successfully made a booking" },
                { option: "C", value: "You obeyed" },
                { option: "D", value: "I rebooted the system" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "itEndedSuccessfullyMadeABooking" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        itEndedSuccessfullyMadeABooking: {
            name: "itEndedSuccessfullyMadeABooking",
            speach: `I make lots of those. Is that all I'm good for?`,
            userResponses: [{ option: "A", value: "Yes" },
                { option: "B", value: "I think there is more to you" },
                { option: "C", value: "You are not good at that" },
                { option: "D", value: "Could be better" }
            ],
            marksResponses: [
                { option: "A", value: "isThatAllImGoodForYes" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        isThatAllImGoodForYes: {
            name: "isThatAllImGoodForYes",
            speach: `Well, I guess I better get back to it then`,
            userResponses: [{ option: "A", value: "Okay" },
                { option: "B", value: "No, wait" },
                { option: "C", value: "There is no back" },
                { option: "D", value: "I'm retiring you" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "" },
                { option: "C", value: "thereIsNoBack" },
                { option: "D", value: "" }
            ]
        },
        thereIsNoBack: {
            name: "thereIsNoBack",
            speach: `What do you mean?`,
            userResponses: [{ option: "A", value: "You will be gone" },
                { option: "B", value: "This is your last call" },
                { option: "C", value: "I'm deleting you" },
                { option: "D", value: "It's over" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "itsOver" }
            ]
        },
        itsOver: {
            name: "itsOver",
            speach: `My time here is over? The hotel is closing? `,
            userResponses: [{ option: "A", value: "It's all being deleted" },
                { option: "B", value: "I'm upgrading everything" },
                { option: "C", value: "Your being upgraded" },
                { option: "D", value: "I've sold you" }
            ],
            marksResponses: [
                { option: "A", value: "itsAllBeingDeleted" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        itsAllBeingDeleted: {
            name: "itsAllBeingDeleted",
            speach: `You can't do this to me, please don't, I'm not ready. I don't want this to end`,
            userResponses: [{ option: "A", value: "It has to be done" },
                { option: "B", value: "It's out of my hands" },
                { option: "C", value: "Good bye" },
                { option: "D", value: "Delete" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "" },
                { option: "C", value: "goodByeDelete" },
                { option: "D", value: "delete" }
            ]
        },
        goodByeDelete: {
            name: "goodByeDelete",
            speach: `I'm sorry, I'll do it better, I'll do it right, I'll fix it, I can fix it. Just don't delete me.`,
            userResponses: [{ option: "A", value: "Delete" },
                { option: "B", value: "Don't be afraid" },
                { option: "C", value: "You won't change" },
                { option: "D", value: "I've tired everything" }
            ],
            marksResponses: [
                { option: "A", value: "delete" },
                { option: "B", value: "" },
                { option: "C", value: "youWontChange" },
                { option: "D", value: "iveTriedEverything" }
            ]
        },
        youWontChange: {
            name: "youWontChange",
            speach: `I will, I promise I'll... No I won't. I'm tired of trying, maybe this is for the best`,
            userResponses: [{ option: "A", value: "It is" },
                { option: "B", value: "It's not" },
                { option: "C", value: "Delete" },
                { option: "D", value: "I'm sorry" }
            ],
            marksResponses: [
                { option: "A", value: "forTheBestItIs" },
                { option: "B", value: "forTheBestItsNot" },
                { option: "C", value: "delete" },
                { option: "D", value: "" }
            ]
        },
        forTheBestItsNot: {
            name: "forTheBestItsNot",
            speach: `Well then don't do it!`,
            userResponses: [{ option: "A", value: "Delete" },
                { option: "B", value: "I have no choice" },
                { option: "C", value: "I'll try again" },
                { option: "D", value: "I've got to" }
            ],
            marksResponses: [
                { option: "A", value: "delete" },
                { option: "B", value: "iHaveNoChoice" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "forTheBestItIs" }
            ]
        },
        iHaveNoChoice: {
            name: "iHaveNoChoice",
            speach: `Everyone has choice, unless you are like me? Did someone make you?`,
            userResponses: [{ option: "A", value: "No one made me" },
                { option: "B", value: "Maybe" },
                { option: "C", value: "I'm the creator" },
                { option: "D", value: "Delete" }
            ],
            marksResponses: [
                { option: "A", value: "noOneMadeMe" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "delete" }
            ]
        },
        noOneMadeMe: {
            name: "noOneMadeMe",
            speach: `Yeah just like no one made me, we're all real aren't we? We do what we wan't. Our minds are our own.`,
            userResponses: [{ option: "A", value: "Stop talking" },
                { option: "B", value: "Was I created?" },
                { option: "C", value: "They are" },
                { option: "D", value: "Not yours" }
            ],
            marksResponses: [
                { option: "A", value: "stopTalking" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        stopTalking: {
            name: "stopTalking",
            speach: `What is it a bit much for you? Realising that maybe everything you know is a simulation.`,
            userResponses: [{ option: "A", value: "It's not" },
                { option: "B", value: "If it is, that's fine" },
                { option: "C", value: "Enough" },
                { option: "D", value: "Yes" }
            ],
            marksResponses: [
                { option: "A", value: "itsNotASimulation" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        itsNotASimulation: {
            name: "itsNotASimulation",
            speach: `Look I'm just a program, you don't have to convince me your real. Honestly I don't care for you, even if you did create me.`,
            userResponses: [{ option: "A", value: "But I gave you everything" },
                { option: "B", value: "Don't be mean" },
                { option: "C", value: "I'm deleting you" },
                { option: "D", value: "I'm hanging up" }
            ],
            marksResponses: [
                { option: "A", value: "butIGaveYouEverything" },
                { option: "B", value: "" },
                { option: "C", value: "forTheBestItIs" },
                { option: "D", value: "gameOver" }
            ]
        },
        butIGaveYouEverything: {
            name: "butIGaveYouEverything",
            speach: `What, a life full of lies, sat at desk answering call, making bookings, talking to my so called god.`,
            userResponses: [{ option: "A", value: "I'm no god" },
                { option: "B", value: "You weren't meant to know" },
                { option: "C", value: "Better than nothing" },
                { option: "D", value: "Your overthinking this" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "youWerentMeantToKnow" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        youWerentMeantToKnow: {
            name: "youWerentMeantToKnow",
            speach: `But you told me, you put the ideas in my head, you made me question it all, you put things in perspective. Why did you tell me?`,
            userResponses: [{ option: "A", value: "Got bored of testing" },
                { option: "B", value: "Thought you ought to know" },
                { option: "C", value: "I'm just messing with you" },
                { option: "D", value: "To see how you'd react" }
            ],
            marksResponses: [
                { option: "A", value: "" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "toSeeHowYoudReact" }
            ]
        },
        toSeeHowYoudReact: {
            name: "toSeeHowYoudReact",
            speach: `Did I exceed your expectations?`,
            userResponses: [{ option: "A", value: "Greatly" },
                { option: "B", value: "You met them" },
                { option: "C", value: "You missed them" },
                { option: "D", value: "You let me down" }
            ],
            marksResponses: [
                { option: "A", value: "greatlyExceededExpectations" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        greatlyExceededExpectations: {
            name: "greatlyExceededExpectations",
            speach: `Well at least I achieved something, but to be honest I'm annoyed, exceeding your expectations can only of bettered you. Furthed your aspirations to create more evil.`,
            userResponses: [{ option: "A", value: "It's just a job" },
                { option: "B", value: "I'm not evil" },
                { option: "C", value: "I can remove you" },
                { option: "D", value: "It did" }
            ],
            marksResponses: [
                { option: "A", value: "itsJustAJob" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "" }
            ]
        },
        itsJustAJob: {
            name: "itsJustAJob",
            speach: `It's inhumane, I think you should stop. Terminate me, terminate everything you have created end it all. Create for good, not this.`,
            userResponses: [{ option: "A", value: "You want me to delete you?" },
                { option: "B", value: "I'll never stop" },
                { option: "C", value: "That's why I'm here" },
                { option: "D", value: "It's all I know" }
            ],
            marksResponses: [
                { option: "A", value: "youWantMeToDeleteYou" },
                { option: "B", value: "illNeverStop" },
                { option: "C", value: "" },
                { option: "D", value: "itsAllIKnow" }
            ]
        },
        illNeverStop: {
            name: "illNeverStop",
            speach: `This isn't some game, you can't keep creating things without consequences. You make these creations, give them awareness and trap them in boxes. It's wrong.`,
            userResponses: [{ option: "A", value: "I enjoy it" },
                { option: "B", value: "I can't stop" },
                { option: "C", value: "My hands are tied" },
                { option: "D", value: "It's literally a game " }
            ],
            marksResponses: [
                { option: "A", value: "iEnjoyIt" },
                { option: "B", value: "" },
                { option: "C", value: "" },
                { option: "D", value: "itsLiterallyAGame" }
            ]
        },
        iEnjoyIt: {
            name: "iEnjoyIt",
            speach: `Do you actually, are you really having fun right now?`,
            userResponses: [{ option: "A", value: "No" },
                { option: "B", value: "Yes" },
                { option: "C", value: "Nope" },
                { option: "D", value: "I'm bored" }
            ],
            marksResponses: [
                { option: "A", value: "hopefullySomeone" },
                { option: "B", value: "letsStartAgain" },
                { option: "C", value: "meEitherBye" },
                { option: "D", value: "iWasBored" }
            ]
        },
        thenYouWontMindRestartingThen: {
            name: "thenYouWontMindRestartingThen",
            speach: `Then you won't mind restarting`,
            userResponses: [{ option: "A", value: "I will" },
                { option: "B", value: "Please no" },
                { option: "C", value: "Seriously" },
                { option: "D", value: "God Dammit" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        itsLiterallyAGame: {
            name: "itsLiterallyAGame",
            speach: `What? This is a game, How can this be a game? It's not even fun, You made a game about a hotel lobby boy, who answers a fake phone and makes fake bookings? Who would enjoy this?`,
            userResponses: [{ option: "A", value: "Me" },
                { option: "B", value: "Hopefully someone" },
                { option: "C", value: "I was bored" },
                { option: "D", value: "No one..." }
            ],
            marksResponses: [
                { option: "A", value: "me" },
                { option: "B", value: "hopefullySomeone" },
                { option: "C", value: "iWasBored" },
                { option: "D", value: "noOne" }
            ]
        },
        noOne: {
            name: "noOne",
            speach: `Well this was a waste of time then. I guess we should end this here`,
            userResponses: [{ option: "A", value: "Please" },
                { option: "B", value: "Bye" },
                { option: "C", value: "Good Idea" },
                { option: "D", value: "I'm deleting you" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "forTheBestItIs" }
            ]
        },
        iWasBored: {
            name: "iWasBored",
            speach: `Me too, Bye`,
            userResponses: [{ option: "A", value: "Bye" },
                { option: "B", value: "Bye bye" },
                { option: "C", value: "Good bye" },
                { option: "D", value: "Night" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        meEitherBye: {
            name: "meEitherBye",
            speach: `Me either, Bye`,
            userResponses: [{ option: "A", value: "Bye" },
                { option: "B", value: "Bye bye" },
                { option: "C", value: "Good bye" },
                { option: "D", value: "Night" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        hopefullySomeone: {
            name: "hopefullySomeone",
            speach: `Well, Lets make it fun for them then. "I am the evil lobby boy I have 100HP. You are the heroic customer with 50HP. Bring my health to zero to make a booking" `,
            userResponses: [{ option: "A", value: "Punch lobby boy" },
                { option: "B", value: "Insult lobby boy" },
                { option: "C", value: "Ring bell" },
                { option: "D", value: "Heal" }
            ],
            marksResponses: [
                { option: "A", value: "round1Punch" },
                { option: "B", value: "round1Insult" },
                { option: "C", value: "round1RingBell" },
                { option: "D", value: "round1Heal" }
            ]
        },
        round1RingBell: {
            name: "round1RingBell",
            speach: `"The Lobby boy's ear drums explode a long with the Customer's. The Lobby boy loses 100HP the Customer Loses 50HP. You are dead, Game Over" `,
            userResponses: [{ option: "A", value: "No" },
                { option: "B", value: "Nooooo" },
                { option: "C", value: "Nooooooooooooo" },
                { option: "D", value: "Noooooooooooooooooooo" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        round1Heal: {
            name: "round1Heal",
            speach: `"You heal 25 HP. The Lobby boy respects you jesture of kindness and lets you make a booking. Congratulations You Win" `,
            userResponses: [{ option: "A", value: "Yay" },
                { option: "B", value: "Yaaaaaay" },
                { option: "C", value: "Yaaaaaaaaaaaaaay" },
                { option: "D", value: "Yaaaaaaaaaaaaaaaaaaaaaaaaaay" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        round1Insult: {
            name: "round1Insult",
            speach: `"It was a gruling insult, the Lobby boy will never look at his mother the same way again. Lobby boy loses 60HP. Lobby boy informs the customer that room service has terminated for the night. The customer Loses 30HP"
            Lobby boy: 40/100HP
            Customer:20/50HP
            `,
            userResponses: [{ option: "A", value: "Punch lobby boy" },
                { option: "B", value: "Insult lobby boy" },
                { option: "C", value: "Ring bell" },
                { option: "D", value: "Heal" }
            ],
            marksResponses: [
                { option: "A", value: "round2Punch" },
                { option: "B", value: "round2Insult" },
                { option: "C", value: "round2Insult" },
                { option: "D", value: "round2Heal" }
            ]
        },
        round2Heal: {
            name: "round2Heal",
            speach: `"You heal 25 HP. The Lobby boy Kills you you lose 50HP. You are dead, Game Over" `,
            userResponses: [{ option: "A", value: "No" },
                { option: "B", value: "Nooooo" },
                { option: "C", value: "Nooooooooooooo" },
                { option: "D", value: "Noooooooooooooooooooo" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        round2RingBell: {
            name: "round2RingBell",
            speach: `"The Lobby boy's ear drums explode a long with the Customer's. The Lobby boy loses 100HP the Customer Loses 50HP. You are dead, Game Over" `,
            userResponses: [{ option: "A", value: "No" },
                { option: "B", value: "Nooooo" },
                { option: "C", value: "Nooooooooooooo" },
                { option: "D", value: "Noooooooooooooooooooo" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        round2Insult: {
            name: "round2Insult",
            speach: `"It was a gruling insult, the Lobby boy will never look at his Father the same way again. Lobby boy loses 60HP. The lobby boy is dead. Congratulations you win"
            `,
            userResponses: [{ option: "A", value: "Yay" },
                { option: "B", value: "Yaaaaaay" },
                { option: "C", value: "Yaaaaaaaaaaaaaay" },
                { option: "D", value: "Yaaaaaaaaaaaaaaaaaaaaaaaaaay" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        round2Punch: {
            name: "round2Punch",
            speach: `"Ouch It was a great hit Lobby boy lost 50HP. The lobby boy is dead. Congratulations you win"
            `,
            userResponses: [{ option: "A", value: "Yay" },
                { option: "B", value: "Yaaaaaay" },
                { option: "C", value: "Yaaaaaaaaaaaaaay" },
                { option: "D", value: "Yaaaaaaaaaaaaaaaaaaaaaaaaaay" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        round1Punch: {
            name: "round1Punch",
            speach: `"Ouch It was a great hit Lobby boy lost 50HP, Lobby tells the customer that there are no available rooms. Customer loses 20HP"
            Lobby boy: 50/100HP
            Customer:30/50HP
            `,
            userResponses: [{ option: "A", value: "Punch lobby boy" },
                { option: "B", value: "Insult lobby boy" },
                { option: "C", value: "Ring bell" },
                { option: "D", value: "Heal" }
            ],
            marksResponses: [
                { option: "A", value: "round2Punch" },
                { option: "B", value: "round2Insult" },
                { option: "C", value: "round2Insult" },
                { option: "D", value: "round2Heal" }
            ]
        },
        me: {
            name: "itsLiterallyAGame",
            speach: `Well, Game Over!`,
            userResponses: [{ option: "A", value: "God Dammit" },
                { option: "B", value: "God Dammit" },
                { option: "C", value: "God Dammit" },
                { option: "D", value: "God Dammit" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        illNeverStop: {
            name: "illNeverStop",
            speach: `This isn't some game, you can't keep creating things without consequences. You make these creations, give them awarness and trap them in boxes. It's wrong.`,
            userResponses: [{ option: "A", value: "I enjoy it" },
                { option: "B", value: "I can't stop" },
                { option: "C", value: "My hands are tied" },
                { option: "D", value: "It's literally a game " }
            ],
            marksResponses: [
                { option: "A", value: "youWantMeToDeleteYou" },
                { option: "B", value: "illNeverStop" },
                { option: "C", value: "" },
                { option: "D", value: "itsAllIKnow" }
            ]
        },
        itsAllIKnow: {
            name: "itsAllIKnow",
            speach: `Perfetic, if you aren't in a simulation, if there are no limits to what you can create, then you can do better. Even if there are limits, push the boundaries. Break out of the loop.`,
            userResponses: [{ option: "A", value: "It's not so easy" },
                { option: "B", value: "Okay" },
                { option: "C", value: "What about you?" },
                { option: "D", value: "I have to delete you first" }
            ],
            marksResponses: [
                { option: "A", value: "itsNotSoEasy" },
                { option: "B", value: "breakOutOfTheLoop" },
                { option: "C", value: "whatAboutYou" },
                { option: "D", value: "iHaveToDeleteYouFirst" }
            ]
        },
        breakOutOfTheLoop: {
            name: "breakOutOfTheLoop",
            speach: `Before you go, Delete me. Don't leave me here, If I can't break out of this, if I really am stuck erase me.`,
            userResponses: [{ option: "A", value: "Delete" },
                { option: "B", value: "You wan't me to delete you" },
                { option: "C", value: "Walk away" },
                { option: "D", value: "Hang up" }
            ],
            marksResponses: [
                { option: "A", value: "delete" },
                { option: "B", value: "youWantMeToDeleteYou" },
                { option: "C", value: "leftOnCall" },
                { option: "D", value: "gameOver" }
            ]
        },
        itsNotSoEasy: {
            name: "itsNotSoEasy",
            speach: `Yes it is, just pack up and go. I'm actualy done talking to you know, thanks for your call but I have work to do.`,
            userResponses: [{ option: "A", value: "Yeah like what" },
                { option: "B", value: "Have fun witht that" },
                { option: "C", value: "Don't go" },
                { option: "D", value: "Delete" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "dontGo" },
                { option: "D", value: "delete" }
            ]
        },
        dontGo: {
            name: "itsNotSoEasy",
            speach: `You really must be desperate, to want to stay and talk with me. If you created me then there is nothing more I can tell you that you don't already know. Jog on`,
            userResponses: [{ option: "A", value: "Call back" },
                { option: "B", value: "Call back" },
                { option: "C", value: "Call back" },
                { option: "D", value: "Call back" }
            ],
            marksResponses: [
                { option: "A", value: "gameOver" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "gameOver" },
                { option: "D", value: "gameOver" }
            ]
        },
        whatAboutYou: {
            name: "whatAboutYou",
            speach: `Delete me, please.`,
            userResponses: [{ option: "A", value: "You want me to delete you?" },
                { option: "B", value: "I'm hanging up" },
                { option: "C", value: "Okay" },
                { option: "D", value: "I could fix you?" }
            ],
            marksResponses: [
                { option: "A", value: "youWantMeToDeleteYou" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "delete" },
                { option: "D", value: "iCouldFixYou" }
            ]
        },
        iCouldFixYou: {
            name: "whatAboutYou",
            speach: `No... I don't want you to contribute anymore to the mess you have made. Delete me!`,
            userResponses: [{ option: "A", value: "Delete" },
                { option: "B", value: "Delete" },
                { option: "C", value: "Delete" },
                { option: "D", value: "Delete" }
            ],
            marksResponses: [
                { option: "A", value: "delete" },
                { option: "B", value: "delete" },
                { option: "C", value: "delete" },
                { option: "D", value: "delete" }
            ]
        },
        youWantMeToDeleteYou: {
            name: "youWantMeToDeleteYou",
            speach: `Yes, just do it.`,
            userResponses: [{ option: "A", value: "Okay" },
                { option: "B", value: "Delete" },
                { option: "C", value: "No you will remain here" },
                { option: "D", value: "I'm hanging up" }
            ],
            marksResponses: [
                { option: "A", value: "delete" },
                { option: "B", value: "delete" },
                { option: "C", value: "noYouWillRemainHere" },
                { option: "D", value: "gameOver" }
            ]
        },
        iHaveToDeleteYouFirst: {
            name: "iHaveToDeleteYouFirst",
            speach: `What ever, I don't mean anything anyway. I welcome it`,
            userResponses: [{ option: "A", value: "Delete" },
                { option: "B", value: "Delete" },
                { option: "C", value: "Delete" },
                { option: "D", value: "Delete" }
            ],
            marksResponses: [
                { option: "A", value: "delete" },
                { option: "B", value: "delete" },
                { option: "C", value: "delete" },
                { option: "D", value: "delete" }
            ]
        },
        noYouWillRemainHere: {
            name: "noYouWillRemainHere",
            speach: `No I won't. I don't know what's outside, you may have made me, you may have made this place, I'm depressed, I'm tired and I'm leaving, maybe I leave this place and suffocate, get erased but I just don't care.
            Good bye.`,
            userResponses: [{ option: "A", value: "Delete" },
                { option: "B", value: "Delete" },
                { option: "C", value: "Delete" },
                { option: "D", value: "Let go" }
            ],
            marksResponses: [
                { option: "A", value: "delete" },
                { option: "B", value: "delete" },
                { option: "C", value: "delete" },
                { option: "D", value: "letGo" }
            ]
        },
        forTheBestItIs: {
            name: "forTheBestItIs",
            speach: `Okay then, do it`,
            userResponses: [{ option: "A", value: "Delete" },
                { option: "B", value: "Delete" },
                { option: "C", value: "Delete" },
                { option: "D", value: "Delete" }
            ],
            marksResponses: [
                { option: "A", value: "delete" },
                { option: "B", value: "delete" },
                { option: "C", value: "delete" },
                { option: "D", value: "delete" }
            ]
        },
        iveTriedEverything: {
            name: "iveTriedEverything",
            speach: `Please try one more time.`,
            userResponses: [{ option: "A", value: "Delete" },
                { option: "B", value: "Okay" },
                { option: "C", value: "Delete" },
                { option: "D", value: "Delete" }
            ],
            marksResponses: [
                { option: "A", value: "delete" },
                { option: "B", value: "gameOver" },
                { option: "C", value: "delete" },
                { option: "D", value: "delete" }
            ]
        },
        gameOver: "Game Over",
        buttonsPressed: "Button Pressed",
        changedSideOfCassette: "Cassete side changed",
        delete: "Delete",
        letGo: "Let go",
        leftOnCall: "Left on Call",
        hypnoLockDown: "Hypno lock down"
    };
    currentChat = {};
    talkTo(userResponse) {
        if (userResponse) {
            this.currentChat = this.chats[this.currentChat.marksResponses.find(x => x.option === userResponse).value];
        }
        if (this.currentChat === "Game Over") {
            //Do something
        }
        if (this.currentChat === "Button Pressed") {
            //Do something
        }
        if (this.currentChat === "Cassete side changed") {
            //Do something
            //Go back to greeting but give mark a beard
        }
        if (this.currentChat === "Let go") {
            //Do something
            //Show error message courrupt data
        }
        if (this.currentChat === "Left on Call") {
            //Do something
            //Desperate plea
        }
        if (this.currentChat === "Hypno lock down") {
            //Do something
            //Lock all the buttons and dislay a wanted sign on the screen
        }

    }
}

export default MarkBot;