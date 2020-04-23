const electron = require('electron');   // get the electron object 
const path = require('path');
const url = require('url');

require('electron-reload')(__dirname);
// access the app object using electron object, it represents your application
const app = electron.app;
// create application window using the BrowserWindow object from electron object
const BrowserWindow = electron.BrowserWindow;

// now to create the mainWindow object
var mainWindow;

// bind the app to an event => here the event is 'ready' which is triggered when the app is completely loaded
app.on('ready', function(){
    mainWindow = new BrowserWindow({show:false, webPreferences: {
        nativeWindowOpen: true,
        nodeIntegrationInWorker: true,
        nodeIntegration: true
      }});
    mainWindow.maximize();
    // uncomment to see developer tools
    mainWindow.webContents.openDevTools();
    // hide the menu bar
    mainWindow.setMenuBarVisibility(false);
    // open your html webpage as a url in the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './Home/home.html'),
        protocol: 'file:',
        slashes: true
    }));
    // set it to null on close
    mainWindow.on('close', function(){
        mainWindow = null;
    })
});

app.on('window-all-closed', function(){
    app.quit();
});
