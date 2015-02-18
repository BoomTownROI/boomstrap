# Pattern Library

http://boomtownroi.github.io/boomstrap/

## Contributor Work Flow
#### Working on Master

1) Pull latest

2) Run **gulp server**

3) Do your work

4) Update Boomstrap versions in package.json and bower.json

5) Run **gulp** when done working

6) git commit -a -m "whatever"

7) git tag -a v0.0.0 -m "Release v0.0.0"

8) git push origin master --tags

9) Run **gulp website**

10) Publish release through GitHub

#### Working on Another Branch

1) Create branch from Master

2) Run **gulp server**

3) Do your work

4) Run **gulp** when done working

5) Submit pull request


## Quick Reference

#### Server

While working on Boomstrap, run **gulp server**. Open localhost:9000 in browser. All files are being watched for changes.

```
gulp server
```
When finished, run **gulp** to build production ready files.

```
gulp
```
#### Building Files

If you wish to build all production ready files, run **gulp**.

```
gulp
```

#### Website Task

Publish Boomstrap's changes to GitHub Pages by running gulp website task. [Boomstrap GitHub Pages](http://boomtownroi.github.io/boomstrap/)

```
gulp website
```



## Set Up

#### Install Node

You will need to have Node.js installed on your machine. Click the install button on the [Node.js](http://nodejs.org/) website, download the installer, and accept all default settings when installing.

#### Install Gulp

Install [Gulp](http://gulpjs.com/) globally.

```
npm install -g gulp
```
#### Install Bower

Install [Bower](http://bower.io/) globally.

```
npm install -g bower
```

#### Install Node Modules & Bower Packages

Now that you have Node, Gulp and Bower installed you can install the Node modules and Bower packages required to build.

Change directory to [boomtownroot]/admin_styles/ so that all subsequent commands apply.

Install Node modules (specified in package.json).

```
npm install
```
Next, install Bower packages (specified in bower.json).

```
bower install
```

#### Troubleshooting Node & Bower

Sometimes Node and/or Bower will flake out. When this happens, it may be necessary to delete your local **node_modules** and **bower_components** folders and reinstall.

```
npm install
bower install
```




