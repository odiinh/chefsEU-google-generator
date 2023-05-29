// Modules to control application life and create native browser window
const {app, ipcMain, BrowserWindow, dialog, Menu} = require('electron');
const { event } = require('jquery');
const path = require('path');
const { electron, kill } = require('process');
const RichPresence = require("rich-presence-builder");
const { autoUpdater } = require('electron-updater');
const { fstat } = require('fs');

var userdata
var generatorpreferences

const rp = new RichPresence({ clientID: "830175661321617408"});

discordrpdefine()
async function discordrpdefine() {
  const app = require('./package.json')
    await rp.setState(`Version: ${app.version}`)
    await rp.setStartTimestamp(Date.now())
    await rp.setLargeImage("logo", "Chefs EU")
    await rp.setSmallImage("l_google_logo", "Gmail Generator")
    await rp.setDetails("Logging In")
    await rp.addButton("Join now", "https://discord.gg/MkWzg8bzP5")
    await rp.go()
    console.log(true)
}
async function ownerloggedin() {
  await rp.setDetails("Developer/Owner Key")
}

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1792,
    height: 1008,
    icon: "./resources/chefs_eu.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true
    }
  })
  const defaultMenu = Menu.getApplicationMenu()
  mainWindow.setMenu(null)
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  ipcMain.on('userdata', async function(event, args) {
    if (args.user.discord.tag == "Odiin#0001") {
      console.log("welcome back odiin")
      mainWindow.setMenu(defaultMenu)
    }

  })

  ipcMain.on("login-complete", async function(event, args) {
    console.log(userdata.status)
    if (userdata.status === "active") {
      await mainWindow.loadFile('gen.html')
      autoUpdater.checkForUpdatesAndNotify()
      console.log("checked for updates")
      
    }
    else if (userdata == undefined) {
      console.log("nice try") //for when the user tries to manually send the "login-complete" event with no userdata
    }
  })
  ipcMain.on("loaded", async function() {
    console.log("fired")
    await mainWindow.show();
    await mainWindow.focus();
    autoUpdater.checkForUpdatesAndNotify()
  })
  autoUpdater.on('update-available', function() {
    console.log("update available")
    mainWindow.webContents.send('update-available');
  });
  autoUpdater.on('update-downloaded', function() {
    console.log("update downloaded")
    mainWindow.webContents.send('update-downloaded');
  });
  ipcMain.on('start-generator', async function(event, args) {
    const { mainGenerator } = require("./gen/Bot.js")
    await rp.setDetails("Generating Accounts...")
    await mainGenerator(args);
    if (userdata.user.discord.tag == "Kicks#2332" || userdata.user.discord.tag == "Odiin#0001" || userdata.user.discord.tag == "Ninasnkrs#6799" || userdata.user.discord.tag == "Teknik#1117" || userdata.user.discord.tag == "aidan#5733") {
      ownerloggedin()
    }
    else {
      await rp.setDetails("Idling...")
    }
    await event.reply('generator-stopped')
  })
  ipcMain.on("kill-generator", async function(event) {
    const { killbrowser } = require("./gen/Bot.js")
    console.log("killrequest")
    await killbrowser();
    if (userdata.user.discord.tag == "Kicks#2332" || userdata.user.discord.tag == "Odiin#0001" || userdata.user.discord.tag == "Ninasnkrs#6799" || userdata.user.discord.tag == "Teknik#1117" || userdata.user.discord.tag == "aidan#5733") {
      ownerloggedin()
    }
    else {
      await rp.setDetails("Idling...")
    }
    await event.reply('generator-stopped')
  })
}

app.whenReady().then(function() {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  app.quit()
})
ipcMain.on("request-quit", async function(event, args) {
  app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('userdata', async function(event, args) {
  //do something with args
  userdata = args
  if (args.user.discord.tag == "Kicks#2332" || args.user.discord.tag == "Odiin#0001" || args.user.discord.tag == "Ninasnkrs#6799" || args.user.discord.tag == "Teknik#1117" || args.user.discord.tag == "aidan#5733") {
    ownerloggedin()
  }
  else {
    await rp.setDetails("Idling...")
  }
  console.log("RECIEVED userdata to main proccess")
});
ipcMain.on('request-userdata', function(event, args) {
  //do something with args
  event.sender.send('give-userdata', userdata);
});



ipcMain.on('app-version', function(event) {
  event.sender.send('app-version', { version: app.getVersion() });
});
ipcMain.on('restart-app', async function() {
  console.log("restarting")
  autoUpdater.quitAndInstall();
});
