import {
  BigNumber
} from "./chunk-56W7LDOD.js";
import {
  hexlifyValue
} from "./chunk-BK72YQKX.js";
import {
  concat,
  decodeAbiParameters,
  encodeAbiParameters,
  keccak256,
  pad,
  parseAbiParameters
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/common/ERC4337Utils.ts
import { Buffer } from "buffer";
function packUserOp(op1, forSignature = true) {
  let op;
  if ("callGasLimit" in op1) {
    op = packUserOpData(op1);
  } else {
    op = op1;
  }
  if (forSignature) {
    const packedUserOp = encodeAbiParameters(
      parseAbiParameters("address, uint256, bytes32, bytes32, bytes32, uint256, bytes32, bytes32"),
      [
        op.sender,
        BigInt(op.nonce),
        keccak256(op.initCode),
        keccak256(op.callData),
        op.accountGasLimits.toString(),
        BigInt(op.preVerificationGas),
        op.gasFees.toString(),
        keccak256(op.paymasterAndData)
      ]
    );
    return packedUserOp;
  } else {
    const packedUserOp = encodeAbiParameters(
      parseAbiParameters("address, uint256, bytes, bytes, bytes32, uint256, bytes32, bytes, bytes"),
      [
        op.sender,
        BigInt(op.nonce),
        op.initCode,
        op.callData,
        op.accountGasLimits.toString(),
        BigInt(op.preVerificationGas),
        op.gasFees.toString(),
        op.paymasterAndData,
        op.signature
      ]
    );
    return packedUserOp;
  }
}
function packUint(high128, low128) {
  return pad(BigNumber.from(high128).shl(128).add(low128).toHexString(), { size: 32 });
}
function packPaymasterData(paymaster, paymasterVerificationGasLimit, postOpGasLimit, paymasterData) {
  const paymasterAndData = paymasterData ? paymasterData : "0x";
  return concat([
    paymaster,
    packUint(paymasterVerificationGasLimit, postOpGasLimit),
    paymasterAndData
  ]);
}
function packUserOpData(op) {
  let paymasterAndData;
  if (op.paymaster == null) {
    paymasterAndData = "0x";
  } else {
    if (op.paymasterVerificationGasLimit == null || op.paymasterPostOpGasLimit == null) {
      throw new Error("paymaster with no gas limits");
    }
    paymasterAndData = packPaymasterData(op.paymaster, op.paymasterVerificationGasLimit, op.paymasterPostOpGasLimit, op.paymasterData);
  }
  return {
    sender: op.sender,
    nonce: BigNumber.from(op.nonce).toHexString(),
    initCode: op.factory == null ? "0x" : concat([op.factory, op.factoryData ?? ""]),
    callData: op.callData,
    accountGasLimits: packUint(op.verificationGasLimit, op.callGasLimit),
    preVerificationGas: BigNumber.from(op.preVerificationGas).toHexString(),
    gasFees: packUint(op.maxPriorityFeePerGas, op.maxFeePerGas),
    paymasterAndData,
    signature: op.signature
  };
}
function getUserOpHash(op, entryPoint, chainId) {
  const userOpHash = keccak256(packUserOp(op, true));
  const enc = encodeAbiParameters(parseAbiParameters("bytes32, address, uint256"), [userOpHash, entryPoint, BigInt(chainId)]);
  return keccak256(enc);
}
var ErrorSig = keccak256(Buffer.from("Error(string)")).slice(0, 10);
var FailedOpSig = keccak256(Buffer.from("FailedOp(uint256,string)")).slice(0, 10);
function decodeErrorReason(error) {
  if (error.startsWith(ErrorSig)) {
    const [message] = decodeAbiParameters(parseAbiParameters("string"), "0x" + error.substring(10));
    return { message };
  } else if (error.startsWith(FailedOpSig)) {
    const [opIndexBigInt, message] = decodeAbiParameters(parseAbiParameters("uint256, string"), "0x" + error.substring(10));
    const formattedMessage = `FailedOp: ${message}`;
    return {
      message: formattedMessage,
      opIndex: Number(opIndexBigInt)
    };
  }
}
function rethrowError(e) {
  let error = e;
  let parent = e;
  if (error?.error != null) {
    error = error.error;
  }
  while (error?.data != null) {
    parent = error;
    error = error.data;
  }
  const decoded = typeof error === "string" && error.length > 2 ? decodeErrorReason(error) : void 0;
  if (decoded != null) {
    e.message = decoded.message;
    if (decoded.opIndex != null) {
      const errorWithMsg = concat([ErrorSig, encodeAbiParameters(parseAbiParameters("string"), [decoded.message])]);
      parent.data = errorWithMsg;
    }
  }
  throw e;
}
function deepHexlify(obj) {
  if (typeof obj === "function") {
    return void 0;
  }
  if (obj == null || typeof obj === "string" || typeof obj === "boolean") {
    return obj;
  } else if (obj._isBigNumber != null || typeof obj !== "object") {
    const hexlified = hexlifyValue(obj).replace(/^0x0/, "0x");
    return hexlified;
  }
  if (Array.isArray(obj)) {
    return obj.map((member) => deepHexlify(member));
  }
  return Object.keys(obj).reduce(
    (set, key) => ({
      ...set,
      [key]: deepHexlify(obj[key])
    }),
    {}
  );
}
function resolveHexlify(a) {
  return deepHexlify(a);
}

export {
  packUserOp,
  packUint,
  packPaymasterData,
  packUserOpData,
  getUserOpHash,
  decodeErrorReason,
  rethrowError,
  deepHexlify,
  resolveHexlify
};
//# sourceMappingURL=chunk-QDPQZ6SZ.js.map