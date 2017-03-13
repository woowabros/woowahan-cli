# wooowahan-cli

Woowahan.js의 command line utility 입니다.

> woowahan-cli를 사용하기 위해서는 nodejs, npm 이 설치되어있어야 합니다.

## 구성요소
- WoowahanJS
- Webpack
- Babel
- Bootstrap

## 설치 

### 전역 

```
npm install -g woowahan-cli
```



## Woowahan-cli 사용법

### 명령문 구조

```
woowahan-cli <command> <option>
```


#### 1. new

'YourAppName' 의 신규 App 생성

```
woowahan-cli new YourAppName
```

#### 2. init


기존에 폴더가 존재하는 경우 해당 폴더를 대상으로 Woowahan App 생성

```
mkdir yourFolder
cd yourFolder
woowahan-cli init YourAppName
```
 
#### 3. view

뷰 생성


```
woowahan-cli view viewName < option >
``` 

option :
  - no-option : 기본 뷰 생성
  - -c, --collection : 콜렉션뷰 생성
 
#### 4. reducer

리듀서 생성

```
woowahan-cli reducer reducerName actionName
```

 
##### 프로젝트 생성시 기본구조 (new, init)
```
App
|- actions
	  |-- index.js
|- assets
    |-- css
        |-- default.scss
        |-- bootstrap.3.3.7.min.scss
    |-- images
        |-- icon.jpg
|- config
    |-- common.js
    |-- development.js
    |-- index.js
    |-- production.js
|- layouts
    |-- default.js
    `-- default.hbs
|- node_modules
|- reducers
    |-- idnex.js
    |-- posts.js
    |-- toolbox.js
|- views
	  |-- home
        |-- index.js
        `-- index.hbs
	  |-- posts
        |-- row-items		  
        |		|-- index.js
        |		`-- index.hbs
        |-- index.js
        `-- index.hbs		  
|-- index.html
|-- main.js
|- .babelrc
|- README.md
|- package.json
|- webpack.config.js
```

## 로컬 테스트


```
woowahan-cli new YourAppName
cd YourAppName
npm run dev
```
[http://localhost:8080](http://localhost:8080) 에서 확인 가능합니다.

## 빌드

```
woowahan-cli new YourAppName
cd YourAppName
npm run build
```
빌드된 파일은 dist 폴더에 생성됩니다.

```
App
|- dist
    |-- css
        |-- default.scss
        |-- bootstrap.3.3.7.min.scss
    |-- images
        |-- icon.jpg
    |-- bundle.js
    |-- index.html
    |- actions
    	  |-- index.js
    |- assets
        |-- css
            |-- default.scss
            |-- bootstrap.3.3.7.min.scss
        |-- images
            |-- icon.jpg
    |- config
        |-- common.js
        |-- development.js
        |-- index.js
        |-- production.js
    |- layouts
        |-- default.js
        `-- default.hbs
    |- node_modules
    |- reducers
        |-- idnex.js
        |-- posts.js
        |-- toolbox.js
    |- views
    	  |-- home
            |-- index.js
            `-- index.hbs
    	  |-- posts
            |-- row-items		  
            |		|-- index.js
            |		`-- index.hbs
            |-- index.js
            `-- index.hbs		  
    |-- index.html
    |-- main.js
    |- .babelrc
    |- README.md
    |- package.json
    |- webpack.config.js
```

빌드된 결과를 확인하기 위해서는 간단하게 로컬서버를 동작시켜 확인 가능합니다. 
***[http-server](https://www.npmjs.com/package/http-server)*** 를 다운받으세요. 

```
npm install -g http-server
cd dist
http-server
```
[http://localhost:8080](http://localhost:8080) 에서 빌드된 파일을 확인 가능합니다.




## 로컬세팅

Woowahan-cli는 오픈소스입니다. Woowahan-cli를 다운받아 원하는 기능을 추가하시거나 내부 구조를 확인하실수 있습니다. 

```
git clone https://github.com/woowabros/woowahan-cli.git
cd woowahan-cli
npm link

```

로컬상태에서 Woowahan-cli를 사용하실 수 있습니다.


