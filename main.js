const { app, BrowserWindow, ipcMain, webContents } = require("electron");
const path = require("path");

const createWindow = () => {
  const options = {
    width: 320,
    height: 240,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    }
  };

  const firstWindow = new BrowserWindow(options);
  const secondWindow = new BrowserWindow(options);

  firstWindow.loadFile('index.html');
  secondWindow.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  // 공유해야 하는 데이터는 메인 프로세스에서 보유.
  let apples = 10;

  // ipcMain 은 메인 프로세스에서 렌더러 프로세스로 통신할 때 사용.
  ipcMain.on('reqCount', (e) => {
    // 응답해야 하는 경우, 매개변수로 전달된 event 객체에 reply 함수를 호출하여 데이터를 전달함.
    e.reply('count', apples);
  });

  ipcMain.on('reqSteal', (e) => {
    apples--;
    e.reply('count', apples);
  });

  // 전체 창에 접근해서 데이터를 전달.
  ipcMain.on('reqBroadcast', () => {
    // event 객체는 요청한 창만 가지고 있기 때문에 전체 창에 접근하기 위해 webContents.getAllWebContents() 사용.
    // webContents.getAllWebContents() 함수는 모든 WebContents 인스턴스 배열을 반환함.
    const contents = webContents.getAllWebContents();
    for (const c of contents) {
      c.send('count', apples);
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
