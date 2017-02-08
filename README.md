# wooowahan-cli

Woowahan.js의 command line utility 입니다.

>> woowahan-cli를 사용하기 위해서는 nodejs, npm 이 설치되어있어야 합니다.

## 구성요소
- Webpack
- Babel
- bootstrap
- sass

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
woowahan-cli new YourAppName
```
 
##### 프로젝트 생성시 기본구조 (new, init)
```
App
|- node_modules
|- src
	|-- actions
		  |-- index.js
	|-- layouts
		  |-- layout.js
		  `-- layout.hbs
	|-- reducers
		  |-- posts.js
	|-- sass
		  |-- style.scss
	|-- views
		  |-- home
		  		|-- index.js
		  		`-- index.hbs
		  |-- posts		  
		  		|-- index.js
		  		`-- index.hbs		  
	|-- index.html
	|-- main.js
|- .babelrc
|- .gitignore
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
|- node_modules
|- src
	|-- actions
		  |-- index.js
	|-- layouts
		  |-- layout.js
		  `-- layout.hbs
	|-- reducers
		  |-- posts.js
	|-- sass
		  |-- style.scss
	|-- views
		  |-- home
		  		|-- index.js
		  		`-- index.hbs
		  |-- posts		  
		  		|-- index.js
		  		`-- index.hbs		  
	|-- index.html
	|-- main.js
|- .babelrc
|- .gitignore
|- package.json
|- webpack.config.js
```


생성된 파일을 확인하기 위해서는 로컬서버를 통해서 확인가능합니다. 간단한 서버를 위해서 '[http-server](https://www.npmjs.com/package/http-server)' 를 다운받습니다. 

```
npm install -g http-server
cd dist
http-server
```
[http://localhost:8080](http://localhost:8080) 에서 빌드된 파일을 확인 가능합니다.




## 로컬세팅

```
git clone https://github.com/woowabros/woowahan-cli.git
cd woowahan-cli
npm link

```

로컬상태에서 woowahan-cli를 사용하실 수 있습니다.


