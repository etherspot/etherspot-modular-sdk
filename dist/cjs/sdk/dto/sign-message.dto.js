"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignMessageDto = void 0;
const tslib_1 = require("tslib");
const index_js_1 = require("./validators/index.js");
class SignMessageDto {
}
exports.SignMessageDto = SignMessageDto;
tslib_1.__decorate([
    (0, index_js_1.IsBytesLike)({
        acceptText: true,
    })
], SignMessageDto.prototype, "message", void 0);
//# sourceMappingURL=sign-message.dto.js.map