import {Injectable} from 'angular2/core';

export enum Phrases {
    OK,
    GREETING,
    NAME
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