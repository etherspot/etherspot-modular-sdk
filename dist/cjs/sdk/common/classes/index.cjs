var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/sdk/common/classes/index.ts
var classes_exports = {};
__export(classes_exports, {
  BaseClass: () => BaseClass,
  Synchronized: () => Synchronized
});
module.exports = __toCommonJS(classes_exports);

// src/sdk/common/classes/synchronized.ts
var Synchronized = class {
};

// src/sdk/common/classes/base-class.ts
var BaseClass = class {
  constructor(raw) {
    if (raw) {
      Object.assign(this, raw);
    }
  }
};
//# sourceMappingURL=index.cjs.map