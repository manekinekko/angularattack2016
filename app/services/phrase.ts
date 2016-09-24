import {Injectable} from '@angular/core';

export enum Phrases {
    OK, GREETING, NAME, HELP,
    LOOKUP_THINGS, LOOKUP_COLOR, LOOKUP_FACE, LOOKUP_TEXT
}

const DICTIONARY = {
    "OK": [
        'Ok', 'I got it', 'Gotcha'
    ],
    "GREETING": [
        'Hi', 'Hello', 'Welcome'
    ],
    "NAME": [
        'What is your name?', 'Who are you?'
    ],
    "HELP": [
        'How can I help you?', 'How can I assist you?', 'Can I help?', 'Do you need help?'
    ],
    "LOOKUP_THINGS": [
        'Let me check that for you.', 'Let me search that for you.', 'Let me find that for you.', 'Let me analyse it for you.'
    ],
    "LOOKUP_COLOR": [
        'Let me analyse them.', 'Let me identify them.', 'Let me collect them.'
    ],
    "LOOKUP_FACE": [
        'Let me describe your face.', 'Let me see how you feel.'
    ],
    "LOOKUP_TEXT": [
        'Let me read this for you.', 'Let me spell this for you.'
    ]
}

@Injectable()
export class Phrase {

    constructor() { }

    public get(phrase: Phrases) {
        let phrases = DICTIONARY[Phrases[phrase]];
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

}
