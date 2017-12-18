<div align="center" style="margin-bottom:60px;">
  <img src ="src/renderer/assets/img/logo.svg" width="40%"/><br><br>

  [![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
  [![forthebadge](http://forthebadge.com/images/badges/made-with-vue.svg)](http://forthebadge.com)
  [![forthebadge](http://forthebadge.com/images/badges/winter-is-coming.svg)](http://forthebadge.com)

</div>


# PICS APP *v1.1.4*
An elegant and simple application to manage photos. Built with web technologies and vue.js.

## Actual version
- **stable** v1.1.4
- **last version** v1.1.4
> Use the tags in the history to find the corresponding commit.

## Documentation
You can find the documentation in the `/docs` folder or on this [GitBook](https://bastiennicoud.gitbooks.io/pics) with a better layout.

## Setting up development
### Environment / dependencies
The app has been programmed with [electron](https://electronjs.org/). A few requirements are necessary to start.

- node.js ^8.9.1
- npm ^5.5.1

We has used some libraries, documentation links below:
- [elctron](https://electronjs.org/docs) *Build desktop apps with web technologies*
- [electron-vue](https://github.com/SimulatedGREG/electron-vue) *A starter boilerplate to use electron with vue.js*
- [vue.js](https://vuejs.org/) *A progressive front end javascript framework*

See the [package.json](package.json) file to see all the project dependencies.  
**Note :** The [7zip-bin](https://www.npmjs.com/package/7zip-bin) dependency varies depending on your operating system. Node.js can attempt to install a version which is not supported by your os. Thus. It will displays warning messages. Nevermind the right version is correctly installed.  
If you're on Windows or linux, node will try to install [fsevents](https://www.npmjs.com/package/fsevents) and displays a warning message, which is an optional library (only supported Mac OS).


### Get the sources, and start programming
To start programming, it's simple. See the [documentation](https://bastiennicoud.gitbooks.io/pics) to get more infos about the project's structure.
```bash
# clone the repo
git clone https://github.com/bastiennicoud/PICS.git
# move into the folder
cd PICS
# install the dependencies packages
npm install
# run the app for development
npm run dev
# build the app for production (this will build a package for the os you are on)
npm run build
```
