import http from "http";
import { URL } from "url";
import * as fs from "fs/promises";
import { extname } from "path";

const hostname = "127.0.0.1";
const port = 3000;
const IS_PRD = process.env.NODE_ENV === "production";

const server = http.createServer(async (req, res) => {
  const ext = extname(req.url);
  if (ext === ".js") {
    res.setHeader("Content-Type", "text/javascript");
  }
  try {
    let content;
    if (req.url === "/") {
      content = IS_PRD
        ? await fs.readFile("./index.html", { encoding: "utf8" })
        : DEV_HTML;
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

const DEV_HTML = `
<!DOCTYPE html>
  <head>
      <title>React As Is</title>
      <script type="importmap">
        {
          "imports": {
              "react": "https://esm.sh/react@17?dev",
              "react-dom": "https://esm.sh/react-dom@17?dev",
              "react/jsx-dev-runtime": "https://esm.sh/react@17/jsx-dev-runtime?dev"
          }
        }
      </script>
      <script src="./build/main.js" type="module"></script>
  </head>
  <body>
      <div id="react-root"></div>
  </body>
</html>`;
