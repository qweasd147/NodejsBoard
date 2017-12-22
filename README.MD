# 리액트 게시판

nodejs + react 환경에서 기초 게시판 제작.
소셜 로그인과 연동해서 게시판 CRUD 제작이 목적. 서버단 보다는 front(react)에 신경을 더 씀

# back-end
nodejs(+express) + mongoDB
# front-end
webpack + react + react-router(v4) + redux + axios + jquery + Material
create-react-app(framework)을 사용하였음

jquery랑 Material는 디자인 관련 제공해주는 함수를 쓸 목적으로 썼고, 사용하는 부분을 최소화 하려고 노력함.
backend랑 frontend 프로젝트는 서로 분리하여 front 쪽은 차후 build하여 다른 서버단 언어(java 등)에서 사용 할 수도 있음

중간에 프로젝트 날리고 다시 repo 판거라 history는 부족함!(내가 만든거 맞음)

# 사용법
그냥 각 서버, 프론트에서 npm run install, npm run start 하면 되고, front는 배포를 원할 시 그냥 npm run build.
어차피 이거 보는 사람은 기초적인 npm 사용법이랑 package.json에 script 정도는 볼 수 있을거라 생각됨...
(사실 '딴 사람보다 나만 이해하면 되지' 라는 마인드 맞음.)

서버단은 /config아래에 있는 secret.js
(DB, sns 로그인 정보. 입력값은 각 소셜 로그인 참고. 입력 항목이 직관적이니 어려움은 없을 것이라 판단됨)
프론트는 /env.* 파일에 있는 properties값 입력해야함. env파일의 REACT_APP_SERVER_HOST값은 server쪽 host 주소.

# 고민중인거....
1.
프론트 쪽 개발 시 webpack dev server를 올리게 된다(build시에는 상관없음). 로그인 관련 처리 시
redirect하는 부분이 필요함. 서버 -> webpack dev server로 redirect 시 redirect 주소,port를 서버 쪽에서 알고 있어야됨....
근데 이게 개발 시 문제고 배포 시에는 서버단 하나만 올리고 프론트는 그냥 build해서 올리면 되는데 webpack dev server 주소를
서버단에서 신경 써야 하는지 고민중... 현재 그냥 하드 코딩함
##17.12.22 ==> 안하는게 더 귀찮고 헤깔려서 그냥 간단하게 만듦