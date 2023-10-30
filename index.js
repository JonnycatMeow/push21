import createBareServer from 'bare-server-node';
import express from "express";
import http from "node:http";
import { uvPath } from "ultraviolet-clone";
import path from "node:path";
import { hostname } from "node:os";
import { URLpath } from "url";
const publicPath = URLpath(new URL("./static/", import.meta.url));
const bare = createBareServer('/bare/', {
});
const app = express();
app.use(express.static(publicPath));
app.use("/worksheets/uv/", express.static(uvPath));
app.use("/uv/", express.static(uvPath));
const server = http();
server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});
server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});
const port = process.env.PORT || 3300;
server.on("listening", () => {
  console.log('UP')
});

server.listen({
  port,
});
