# Setting up development

*More infos about the project structure in the next section*

## Environment / dependencies
A few requirements are necessary to start.

- node.js ^8.9.1
- npm ^5.5.1

We has used some libraries, documentation links below:
- [elctron](https://electronjs.org/docs) *Build desktop apps with web technologies*
- [electron-vue](https://github.com/SimulatedGREG/electron-vue) *A starter boilerplate to use electron with vue.js*
- [vue.js](https://vuejs.org/) *A progressive front end javascript framework*
- [webpack](https://webpack.js.org/) *A module bundler for the web*

See the **package.json** file to see all the project dependencies.

**Note :** The [7zip-bin](https://www.npmjs.com/package/7zip-bin) dependency varies depending on your operating system. Node.js can attempt to install a version which is not supported by your os. Thus. It will displays warning messages. Nevermind the right version is correctly installed.  

If you're on Windows or Linux, Node.js will tries to install [fsevents](https://www.npmjs.com/package/fsevents) and displays a warning message, which is an optional library (only supported by Mac OS).


## Get the sources, and start programming
To start programming, it's simple.

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

Also, see the [app requirements](userdoc/requirements.md) to prepare pictures with the right structure to test the app.