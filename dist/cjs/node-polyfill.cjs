var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/ws/browser.js"(exports, module2) {
    "use strict";
    module2.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

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
//# sourceMappingURL=node-polyfill.cjs.map