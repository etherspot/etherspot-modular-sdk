import {
  require_browser
} from "./chunk-EUHG65MZ.js";

// src/node-polyfill.ts
var WebSocketConstructor = null;
try {
  if (typeof WebSocket !== "undefined") {
    WebSocketConstructor = WebSocket;
  } else {
    WebSocketConstructor = require_browser();
  }
} catch (err) {
  throw new Error("WebSocket not found. Please install `ws` for node.js");
}
if (global) {
  global.WebSocket = WebSocketConstructor;
}
//# sourceMappingURL=chunk-P4BCYDPK.js.map