# Application architecture

Our app is build in two diferents parts :

The electrons main and renderer process.

In our case, the main comunicates with native api (filesystem, dialogs) and the .json where we store all the pics datas. He is also responsible for performing research querys in the pics store.

The renderer runs a vue.js application, he display the interface to the user, and react to his interaction, for view updates, the renderer sends request to the main to get new datas (like the pictures, or the search results) and display it to the user.

The next section describe in details the main modules and renderer components