const http = require("http");
// console.log(http);

const port = 3000;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home Page");
  } else if (req.url === "/about") {
      // blocking code
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        console.log(`${i} ${j}`);
      }
      res.end("About Page");
    }
  } else {
    res.end("Error Page");
  }
});

server.listen(port, console.log(`server running at http:://localhost:${port}`));
