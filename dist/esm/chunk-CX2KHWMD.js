import {
  bufferPercent
} from "./chunk-IXDF7SOZ.js";
import {
  BigNumber
} from "./chunk-56W7LDOD.js";

// src/sdk/common/getGasFee.ts
async function getGasFee(publicClient) {
  try {
    const gasFeeResponse = await publicClient.request(
      {
        method: "eth_maxPriorityFeePerGas",
        params: []
      }
    );
    if (!gasFeeResponse) {
      throw new Error("failed to get priorityFeePerGas");
    }
    const [fee, block] = gasFeeResponse;
    if (BigNumber.from(0).eq(fee)) {
      throw new Error("failed to get priorityFeePerGas");
    }
    const tip = BigNumber.from(fee);
    const buffer = tip.div(100).mul(bufferPercent);
    const maxPriorityFeePerGas = tip.add(buffer);
    const maxFeePerGas = block.baseFeePerGas != null ? block.baseFeePerGas.mul(2).add(maxPriorityFeePerGas) : maxPriorityFeePerGas;
    return { maxFeePerGas, maxPriorityFeePerGas };
  } catch (err) {
    console.warn(
      "getGas: eth_maxPriorityFeePerGas failed, falling back to legacy gas price."
    );
    const gas = await publicClient.getGasPrice();
    return { maxFeePerGas: gas, maxPriorityFeePerGas: gas };
  }
}

export {
  getGasFee
};
//# sourceMappingURL=chunk-CX2KHWMD.js.map