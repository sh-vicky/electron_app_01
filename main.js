const electron = require('electron')

// 어플리케이션 이벤트 생명주기를 관리하는 app 모듈.
const {app} = electron

//어플리케이션 브라우저 창을 생성, 관리하는 BrowserWindow 모듈.
const {BrowserWindow} = electron

const path = require('path')

/**
 * 전역 객체 생성.
 * 전역 객체로 생성하지 않을 경우, 자바스크립트 GC 시 브라우저 창이 종료될 수 있음.
 */
let mainWindow;

// index.html 파일을 BrowserWindow 인스턴스에 로드하기 위한 메서드.
const createWindow = () => {
  // 새로운 브라우저 창 생성.
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // index.html 파일 로드.
  mainWindow.loadFile('index.html')

  // 개발자 도구 오픈.
  // mainWindow.webContents.openDevTools()
}
/*
* 브라우저 창을 열기 위해 createWindow() 호출.
* electron 에서 브라우저 창은 앱 모듈의 준비 이벤트가 발생한 후에만 생성될 수 있음.
* app.whenReady() 를 사용하여 이벤트를 기다릴 수 있음.
* whenReady() 가 Promise 를 resolve 한 후 createWindow() 호출됨.
* */
app
  .whenReady() // 앱이 준비되면,
  .then(() => {
  createWindow() // 윈도우 생성.
  /*
  * 모든 창이 당혀있을 때 앱 종료(window & linux)
  * app 에서 window-all-closed 이벤트를 수신하고 app.quit() 함수를 호출해 어플리케이션 종료.
  * */
  app.on('window-all-closed', () => {
    // macOS 가 아닌 경우 종료.
    if (process.platform !== 'darwin') app.quit()
  })

  /*
  * activate 이벤트를 수신했을 때 열려있는 어플리케이션이 없다면 새로운 어플리케이션 창을 생성.
  * macOS 의 경우 app.quit() 를 사용하지 않았다면 어플리케이션을 종료해도 최소화 상태로 만들 수 있음. 이 경우 새로운 창이 생성되지 않음.
  * */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
