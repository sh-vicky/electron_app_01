# electron 배포를 위한 package.json 설정
## package.json
```json
{
  "name": "01_electron_app",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron .",
    "deploy:osx": "electron-builder --mac",
    "deploy:win": "npm run deploy:win32 && npm run deploy:win64",
    "deploy:win32": "electron-builder --win nsis:ia32",
    "deploy:win64": "electron-builder --win nsis:x64"
  },
  "devDependencies": {
    "electron": "^36.2.0",
    "electron-builder": "^26.0.12"
  },
  "build": {
    "productName": "Start Electron",
    "appId": "net.ex.startelectron",
    "asar": true,
    "mac": {
      "target": [
        "default"
      ]
    },
    "dmg": {
      "title": "Start Electron"
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64",
            "ia32"
          ]
        }
      ]
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": false,
      "createDesktopShortcut": true,
      "language": 1042
    },
    "directories": {
      "buildResources": "./resources/installer/",
      "output": "./dist/",
      "app": "."
    }
  }
}
```
### scripts
- npm run 스크립트 정의.

### build
- 배포를 위한 옵션 정의.

### productName
- application 이름.

### appId
- application ID. 관습적으로 도메인 순서를 반대로 사용.

### asar
- asar 패키지 사용 여부. 앱 파일들을 묶어주는 역할.

### dmg-title
- dmg 파일을 실행했을 때 제목 표시줄에 표시할 이름.

### win-target-target
- Nullsoft Scriptable Install System 을 사용한다는 뜻. 옛날 WinAmp 설치 프로그램.

### win-target-arch
- 32bit 와 64bit 아키텍쳐를 의미함.

### nsis
- nsis 빌드 옵션.

### nsis-onclick
- 원클릭 설치 프로그램 여부.

### nsis-allowToChangeInstallationDirectory
- 설치 디렉토리 변경 여부.

### nsis-createDesktopShortcut
- 바탕화면 바로가기 추가 여부.

### nsis-language
- 설치 프로그램 언어(korean-1042)

### directories
- 배포와 관련된 리소스가 저장된 경로, 배포 파일을 만들어 저장할 경로 등을 지정.

### directories-buildResources
- 빌드할 application 의 폴더 경로.

### directories-output
- 빌드한 application 의 폴더 경로.
