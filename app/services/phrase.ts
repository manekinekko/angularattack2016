import {Injectable} from 'angular2/core';

export enum Phrases {
    OK,
    GREETING,
    NAME,
    HELP
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