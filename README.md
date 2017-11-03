# wooowahan-cli

## 설치 

```
npm install -g woowahan-cli
```


## Woowahan-cli 사용법

```
woowahan-cli new <project-name>
```

 
##### 프로젝트 구조

```
App
├── assets
├── dist
├── src
│   ├── reducers
│   ├── views
│   │   ├── index.js
│   │   ├── layout
│   │   └── main
│   ├── actions.js
│   ├── index.js
│   └── index.html
├── .babelrc
├── package.json
└── webpack.config.js
```

## 빌드

### 개발용 빌드

```
npm run build
```

### 프러덕션용 빌드

```
npm run build:production
```

### 개발 모드 및 정적 서버 실행

빌드 완료 후 로컬 웹서버가(webpack-dev-server) 실행되며 설정된 기본 브라우저로 접속됩니다.

```
npm run dev
```

번들링된 결과 파일은 dist 폴더에 생성되며, assets 폴더 하위의 파일 및 폴더는 dist 로 복사된다.

