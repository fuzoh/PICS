<div align="center">
  <img src ="src/renderer/assets/img/logo.svg" width="40%"/><br><br>

  [![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
  [![forthebadge](http://forthebadge.com/images/badges/made-with-vue.svg)](http://forthebadge.com)
  [![forthebadge](http://forthebadge.com/images/badges/winter-is-coming.svg)](http://forthebadge.com)

</div>


# PICS APP *v0.2.4*
An elegant and simple application to manage photos. Built with web technologies and vue.js.

## Actual version
- **stable** v0.2.2 *Warning not all features are implemented*
- **last version** v0.2.4 *Unstable*
> Use the tags in the history to find the corresponding commit.

## Documentation
You can find the documentation on this [GitBook](https://bastiennicoud.gitbooks.io/pics).

## Setting up development
### Environnment / dependencies
The app is developp with [electron](electronjs.org). A few requirments are necesary to start development.

- node.js ^8.9.1
- npm ^5.5.1

The app use some librarys, documentation links :
- [elctron](electronjs.org/docs)
- [electron-vue](https://github.com/SimulatedGREG/electron-vue) *A starter boilerplate to use electron with vue.js*
- [vue.js](vuejs.org) *A progressive front end javascript framework*

See the [package.json](package.json) file to see all the project dependecies.  
**Note :** The 7zip-bin dependencie varies depending your os. Node.js may attempt to install a version not supported by your os, and thus display some warning messages. No problem, the right version is correctly installed.  
If youre on windows of linux, node try to install fs-event and display a warning message, this library is optionnal (supported only by Mac OS).


### get the sources, and strat developping
To start the development, it's really simple. See the [documentation](https://bastiennicoud.gitbooks.io/pics) to get more infos of the project structure.
```bash
# clone the repo
git clone https://github.com/bastiennicoud/PICS
# move into the folder
cd PICS
# install the packages
npm install
# run the app for development
npm run dev
# build the app for production (this will build a package for the os you are on)
npm run build
```