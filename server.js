import http from "http";
import { URL } from "url";
import * as fs from "fs/promises";
import { extname } from "path";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
  const ext = extname(req.url);
  if (ext === ".js") {
    res.setHeader("Content-Type", "text/javascript");
  }
  try {
    let content;
    if (req.url === "/") {
      content = HTML;
    } else {
      content = await fs.readFile("." + req.url, { encoding: "utf8" });
    }

    res.write(content);
    res.end();
  } catch (error) {
    console.log(req.url, ext);
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const IS_PRD = process.env.NODE_ENV === "production";
const HTML = `
<!DOCTYPE html>
  <head>
      <title>React As Is</title>
      <script type="importmap">
        {
          "imports": {
              "react": "https://esm.sh/react@17${IS_PRD ? "" : "?dev"}",
              "react-dom": "https://esm.sh/react-dom@17${IS_PRD ? "" : "?dev"}",
              "react/jsx-runtime": "https://esm.sh/react@17/jsx-runtime",
              "react/jsx-dev-runtime": "https://esm.sh/react@17/jsx-dev-runtime"
          }
        }
      </script>
      <script src="./build/main.js" type="module"></script>
  </head>
  <body>
      <div id="react-root"></div>
  </body>
</html>`;
