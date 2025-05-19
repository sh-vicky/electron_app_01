# Electron 프로젝트 생성

## election application 생성하기

### 프로젝트 디렉토리 생성 후 이동.
> $ mkdir {projectName} && cd {projectName}
 
### 프로젝트 초기화.
> $ npm init
>> entry point 는 main.js 로 설정.
 
### electron 패키지 의존성 추가.
> $ npm install --save-dev electron
- package.json 설정 파일의 script 필드에 아래와 같이 추가.
```json
{
  "script": {
    "start": "electron ."
  }
}
```
- 아래의 커맨드로 electron app 의 개발 모드를 오픈할 수 있음.
> $ npm start

### electron-builder 설치
- electron 배포 도구 설치.
> $ npm install --save-dev electron-builder
