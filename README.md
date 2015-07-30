# Pattern Library

http://boomtownroi.github.io/boomstrap/

## Contributor Work Flow
#### Working on Master

1) Pull latest

2) Run **gulp server**

3) Do your work

4) Update Boomstrap version in package.json

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

#### Install Node Modules

Now that you have Node and Gulp installed you can install the Node modules required to build.

Change directory to [boomtownroot]/admin_styles/ so that all subsequent commands apply.

Install Node modules (specified in package.json).

```
npm install
```

#### Troubleshooting Node

Sometimes Node will flake out. When this happens, it may be necessary to delete your local **node_modules** folders and reinstall.

```
npm install
```




