const options = {
  uri: "http://7408b66e.ngrok.io"
};
//
// 1. download and running ngrok.exe from https://ngrok.com/
// 2. get Your Tunnel Authtoken from auth ngrok dashboard
// 3. ngrok.exe command
//       ngrok authtoken [Your Tunnel Authtoken]
// => ngrok http 4000
//
// 4. get "Forwarding" Address(ex. http://example.ngrok.io) on ngrok.exe
// 5. update apollo.js
//       uri : "http://localhost:4000"
//              ^
// => uri : "http://example.ngrok.io"
// 내부 4000포트를 이용하기 위해서 위와 같은 설정을 해줘야 한다.
export default options;
