# 리액트 게시판

nodejs + react 환경에서 기초 게시판 제작.
소셜 로그인과 연동해서 게시판 CRUD 제작이 목적. 서버단 보다는 front(react)에 신경을 더 씀

## 1. 사용기술

### 1.1 back-end
nodejs(+express) + mongoDB(3.4.x) + passport

promise(awiat, async 포함)를 사용하여 최대한 깔끔하게 만듦. 때문에 node 버전이 7 이상이어야함

### 1.2 front-end
webpack + react + react-router(v4) + redux + axios + jquery + Material.

create-react-app(framework)을 사용하였음

jquery랑 Material는 디자인 관련 제공해주는 함수를 쓸 목적으로 썼고, 사용하는 부분을 최소화 하려고 노력함.
backend랑 frontend 프로젝트는 서로 분리하여 front 쪽은 차후 build하여 다른 서버단 언어(java 등)에서 사용 할 수도 있음

중간에 프로젝트 날리고 다시 repo 판거라 history는 부족함!(내가 만든거 맞음)

## 2. 사용법
### 2.1 board-backend
    board-backend
    "scripts": {
        "prod": "cross-env NODE_ENV=prod node server.js",
        "dev": "cross-env NODE_ENV=dev node server.js",
        "start": "node server.js"
    },
    prod = product 환경
    dev = development 환경
    start = 기본 환경(실질적으로 사용 안함)

    npm run (prod or dev or start)

/board-backend/config/secret.js 작성

    {
        'mongoDB' : {
            'DBUser' : 'xxxx',
            'DBPassword' : 'xxxx',
            'TB' : 'xxxx',
            'connectURL' : 'mongodb://aaaa:bbbb:cccc/dddd'
        }
        , 'passport' : {
            'naver' : {
                'clientID' : 'xxxx',
                'clientSecret' : 'xxxx',
                'callbackURL' : '/api/authen/login/naver/callback'
            },
            .....
        }
    }

passport 하위의 입력값은 각 소셜 로그인 참고. 입력 항목이 직관적이니 어려움은 없을 것이라 판단됨
DB는 coeectionURL만 작성하여도 사용 가능

### 2.1 board-frontend
    
    "scripts": {
        "start": "node scripts/start.js",
        "build": "node scripts/build.js",
        "test": "node scripts/test.js --env=jsdom"
    },
    
    start = development 환경
    build = 프로젝트 build(소스 번들링 해서 결과 소스를 build 하위에 저장)
    test = test 환경(실질적으로 사용안함)

    npm run (start or build or test)

프론트는 /env.* 파일에 있는 properties값 입력해야함. env파일의 REACT_APP_SERVER_HOST값은 server쪽 host 주소.

==> 프록시 설정으로 해결함. dev 환경(npm run start) 때에도 실질적으로 서버가 2개 올라가서 cors 제한을 풀어 줬는데,
프록시 거쳐서 가서 cors 다시 제한하게 변경함

## 3. 고민중인거....
### 3.1
    프론트 쪽 개발 시 webpack dev server를 올리게 된다(build시에는 상관없음). 로그인 관련 처리 시
    redirect하는 부분이 필요함. 서버 -> webpack dev server로 redirect 시 redirect 주소,port를 서버 쪽에서 알고 있어야됨....
    근데 이게 개발 시 문제고 배포 시에는 서버단 하나만 올리고 프론트는 그냥 build해서 올리면 되는데 webpack dev server 주소를
    서버단에서 신경 써야 하는지 고민중... 현재 그냥 하드 코딩함
    ## 17.12.22 ==> 안하는게 더 귀찮고 헤깔려서 그냥 간단하게 만듦

### 3.2
    get으로 파라미터 넘길 때 encoding, decoding 해야할꺼 같음.
    일단 귀찮아서 보류중
    ## 안해도 됨

### 3.3
    logger 모듈 쓸지 말지 생각해 봐야하는데, 그냥 간단한거라 구지..?