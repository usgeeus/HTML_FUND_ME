DAPPs를 만들때 보통 2개의 repository(따로 깃에 올림)를 가짐.

- 하나는 스마트컨트랙트(백엔드)
- 하나는 프론트엔드 / 자바스크립트 / 웹

Alchemy와 Infura같은 것들은 블록체인 노드를 지원해줌.<br/>
http://127.0.0.1:5500/<br/>
live server<br/>

metamask와 interaction들은 metamask docs에서 볼수 있음<br/>
eg. eth_requestAccounts 는 연결할 떄 사용함.<br/>

ethers-5.6.esm.min.js -> ethers<br/>
```
<script src="./index.js" type="module">이면 js파일에서 getElement해서 함수를 넣어줌.
<script src="./index.js" type="text/javascript"> 이면 html파일에서 <button onclick="connect()"> 이렇게 함수를 넣어줌.
```

JsonRpcProvider와 Web3Provider는 비슷함. <br/>
JsonRpcProvider에는 endpoint url을 직접 넣어줬지만, Web3Provider는 브라우저의 메타마스크를 보고 자동으로 http endpoint를 찾아줌
<br/><br/>
계정 nonce 초기화화려면
```
metamask -> 프로필아이콘 -> 설정 -> 고급 -> 계정 재설정
```

once
```
ethers docs -> provider.once(eventName, listener /*event가 끝나면 listener(내가 정의한 다른함수)가 한번 실행됨.*/)
```

다운로드
```
yarn add --dev prettier
```