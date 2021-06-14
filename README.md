# TokiDoki
RocketPunch 프론트엔드 과제
## 웹소켓 메신저
---
<img src="https://github.com/pikpokjeon/TokoDoki-Chatroom/blob/main/gUoVb601v0.gif" width="600">

### 기능구현 목표
1. 1 : 1 사용자가 서로 메세지를 보낼 수 있으며, 이 내용을 서로 확인 할 수 있습니다.
2. 메세지를 보내면, 즉시 메세지를 확인 할 수 있습니다.
3. 여러 사용자를 등록 가능하며, 가입시 자신의 메세지만을 확인 가능하도록 합니다.
4. 등록되어있지 않은 유저에게 메세지를 보낸다면, 해당 이름의 유저가 등록한다면 기존 메세지를 보여줍니다.
5. 새로운 메세지 보내기를 누르면, 받는 사람이 등록된 유저인지 아닌지 판별하여 보여줍니다. 
6. 요구조건을 충족하기 위해 웹소켓을 이용하며 채팅을 구성합니다. 프론트엔드 단에서 이용자 메세지를 필터링 해줍니다.
---
### 프로젝트 시작하기

1. 백엔드
```
npm run start
```
2. 프론트엔드
```
npm run serve
```
3. 접속 - http://localhost:8080/ 

---
### 기술스택
#### 백엔드
1. Graphql Yoga 

#### 프론트엔드
1. Graphql Apollo-Client
2. Graphql Apollo-Link
3. Vue-Apollo
4. Vuex
---
### 참고사항
- 백엔드 포트(8282) 와 프론트엔드 포트(8080)를 사용 중입니다. 
-  요구조건을 충족하기 위하여 임의로 사용자 이름을 등록 후 사용가능 하도록 하였습니다.
- 등록한 모든 사용자를 친구관계라 가정하고, 새로운 메세지 작성시 추천으로 뜨도록 하였습니다.
### Backlog
- 정규식을 사용하여, 메세지에 링크가 있다면 클릭 할 수 있도록 바꿔줍니다
- 메세지 검색을 이용하여, 접속한 유저의 모든 메세지에서 검색 키워드와 일치하는 대화를 추려서 노출합니다
- html 태크를 시멘틱하게 정리합니다
- 사용하지 않는 코드를 정리합니다 ( 초반에 웹 소켓으로 받아오는 데이터를 props로 내려서 갱신 해주는 것과 vuex로 갱신해 주는 부분 정리, 외..)
- 메세지가 사용자의 ChatArea viewport에 노출된다면 graphql mutation으로 메세지가 읽은 상태로 데이터를 수정해줍니다.


### 파일구조
```
.
└── Project/
    ├── backend/
    │   └── src/
    │       ├── graphql/
    │       │   ├── resolver.js     - schema 처리 로직
    │       │   └── schema.js       - schema 정의 
    │       ├── index.js            - 서버설정
    │       └── lib.js
    └── frontend/
        └── src/
            ├── components/
            │   ├── chatList          - 채팅 좌측/
            │   │   ├── ChatItem.vue      - 채팅방 리스트 반복단위
            │   │   ├── NewChat.vue       - 상단 새로운메세지와 관련된 그룹
            │   │   └── SearchList.vue    - 검색 가능항 채팅방 리스트
            │   ├── chatRoom          - 채팅 우측 /
            │   │   ├── ChatArea.vue      - 채팅내용이 보여지는 영역
            │   │   ├── ChatInfo.vue      - 상단 채팅방 정보
            │   │   ├── Message.vue       - 채팅방에 보내진 메세지 반복단위
            │   │   └── SendInput.vue     - 채팅방에 메세지 보내는 입력필드
            │   ├── ChatList.vue      - 채팅방 좌측 상위-컴포넌트
            │   ├── ChatRoom.vue      - 채팅방 우측 상위-컴포넌트
            │   ├── CreateChat.vue    - NewChat의 하위 컴포넌트, 새로운메세지 작성 (이동필요)
            │   ├── InputModal.vue    - Login과 CreateChat에서 재사용하는 입력부 모달
            │   ├── Login.vue         - 사용할 이름을 작성
            │   └── ProfileLogo.vue   - 기본 프로필로고 SVG 컴포넌트 화
            ├── graphql              /
            │   └── queries.js        - graphql 쿼리문
            ├── store/
            │   └── index.js          - vuex 저장소 이름(states),과 이름 변경(mutations) 만을 사용
            ├── App.vue          
            └── main.js             - apollo-vue의 설정 부분, http와 ws 통신 포트, 엔드포인트 정의
```
