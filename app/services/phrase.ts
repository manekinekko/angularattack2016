import {Injectable} from 'angular2/core';

export enum Phrases {
    OK,
    GREETING
}

const DICTIONARY = {
    "OK": [
        'Ok', 'I got it', 'Gotcha'
    ],
    "GREETING": [
        'Hi', 'Hello', 'Welcome'
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