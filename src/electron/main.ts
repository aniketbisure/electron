import { app, BrowserWindow, ipcMain } from "electron";
import path from 'path';
import { isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        fullscreen: true, // Makes the app always start in fullscreen
        frame: false,     // Removes the default header
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5000');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }

    pollResources(mainWindow);

    ipcMain.handle("getStaticData", () => {
        return getStaticData();
    });
});
