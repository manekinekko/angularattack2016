# README FIRST

## How to use the app

Go the [https://angularlabs.2016.angularattack.io](https://angularlabs.2016.angularattack.io) on your phone or computer. You can ask Angie ([NG](https://www.youtube.com/v/aSFfLVxT5vA&start=46&end=89&version=3&&autoplay=1&loop=1)) the following questions:

- `my name is [name], i am [name]`: Angie will remember your name.
- `who are you`: Angie will introduce herself.
- `help`, `what should I say`: Angie will help you use the app.
- `let me see`, `show me`, `(describe) what do you see`: Angie will tell you what you can see.
- `how do I look`: Angie will try to guess what is your face expression.
- `what color is this`,`tell me colors`: Angie will try to guess the most dominant color.
- `(can you) read this (for me)`: Angie will read a text for you.
- `and this`, `and now`: Angie will replay your last query.


## local devs

```bash
$ # 1) use this command to serve your local dev in your browser (with livereload support)
$
$ npm run serve
$ 
$ # 2) build the browser version of the app
$ 
$ npm run build
$ 
$ # 3) commit all updates to git (with your favorit tool)
$ # MAKE SURE YOU COMMIT sw.js TO GITHUB!!
$
$ # 4) deploy to surge
$
$ npm run deploy
$
```

## Deploy to surge

```
$ npm run deploy
```

## Access the `https` deployed app (not http)

```
https://angularlabs.2016.angularattack.io/
```

# This is your [AngularAttack](https://www.angularattack.com) 2016 Repo

This repo is the start of your AngularAttack 2016 entry. It contains the simple [Angular2 starter](https://angular.io/docs/ts/latest/quickstart.html) files.

**DO NOT MAKE ANY CODE CHECKINS TO THIS REPOSITORY BEFORE THE COMPETITION OFFICIALLY BEGINS.**

**DOING SO COULD DISQUALIFY YOU.**


However, before the competition starts, there are some things we encourage you to do to get prepared for the competition.


### Step 1) Get Your Local Environment setup

Clone this repo locally, and make sure all your team members have access to it.

* Install the latest [Node / NPM](https://nodejs.org).

* `git clone git@github.com:rumblex/angularattack2016-angularlabs.git`

* `cd angularattack2016-angularlabs`

* `npm install`

* `npm start` will start the server locally to test that everything is running correctly


### Step 2) Deploy Your App

While you can't make any checkins before the comp, what you **can** do right now is deploy this sample app to [Surge](https://surge.sh) (our competition hosting provider).

* `npm install -g surge`

* `surge .`

Note: please do not remove the `CNAME` file, as that tells it where to deploy to.

If you receive an error message `"You do not have permission to publish to angularlabs.2016.angularattack.io"`, it might mean another team member has already deployed your project to Surge. Ask them to run the next step to give you access.

### Step 3) Add Your Team Members to Surge

* `surge . --add github@wassimchegham.com,uri@salsa4fun.co.il,attila.csnyi@yahoo.co.uk,gerard.sans@gmail.com`


### Step 4) Wait til competition starts

It begins at exactly [May 14 at 00:00 UTC](https://www.wolframalpha.com/input/?i=May+14,+2016+0:00+UTC). Once the competition starts,   you can write over this project.
