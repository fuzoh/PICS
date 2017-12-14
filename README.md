<div align="center">
  <img src ="src/renderer/assets/img/logo.svg" width="40%"/><br><br>

  [![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
  [![forthebadge](http://forthebadge.com/images/badges/made-with-vue.svg)](http://forthebadge.com)
  [![forthebadge](http://forthebadge.com/images/badges/winter-is-coming.svg)](http://forthebadge.com)

</div>


# PICS APP
An elegant and simple application to manage photos. Built with web technologies and vue.js.

## Actual build **v0.2.3**
Unstable built, work in progress.

## Setting up development
### environnment
The app is developp with electron. A few requirments are necesary to start development.
For this project we work with:
- node.js ^8.9.1
- npm ^5.5.1

See the [package.json](package.json) file to see the project dependecies. Just a note for the 7zip-bin dependencie, it varies depending your os. node.js may attempt to install a version not supported by your operating system, and thus display some error messages. Io problem it is correctly installed.

The app is based on the [electron-vue](https://github.com/SimulatedGREG/electron-vue) boilerplate. He provides a start templates to quickly run a new electron project with vue.js.

### get the sources, and strat developping
To start the development, it's really simple.
```bash
# clone the repo
git clone https://github.com/bastiennicoud/PICS
# move into the folder
cd PICS
# install the packages
npm install
# run the app for development
npm run dev
# build the app for production
npm run build
```