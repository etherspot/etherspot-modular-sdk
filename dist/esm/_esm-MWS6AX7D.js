import {
  require_browser
} from "./chunk-EUHG65MZ.js";
import {
  __toESM
} from "./chunk-LQXP7TCC.js";

// node_modules/isows/_esm/index.js
var WebSocket_ = __toESM(require_browser(), 1);

// node_modules/isows/_esm/utils.js
function getNativeWebSocket() {
  if (typeof WebSocket !== "undefined")
    return WebSocket;
  if (typeof global.WebSocket !== "undefined")
    return global.WebSocket;
  if (typeof window.WebSocket !== "undefined")
    return window.WebSocket;
  if (typeof self.WebSocket !== "undefined")
    return self.WebSocket;
  throw new Error("`WebSocket` is not supported in this environment");
}

// node_modules/isows/_esm/index.js
var WebSocket3 = (() => {
  try {
    return getNativeWebSocket();
  } catch {
    if (WebSocket_.WebSocket)
      return WebSocket_.WebSocket;
    return WebSocket_;
  }
})();
export {
  WebSocket3 as WebSocket
};
//# sourceMappingURL=_esm-MWS6AX7D.js.map