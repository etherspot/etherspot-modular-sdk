import {
  accountAbi
} from "./chunk-ZJ2O6KOQ.js";
import {
  isContract
} from "./chunk-BFP3WTVA.js";
import {
  DEFAULT_QUERY_PAGE_SIZE
} from "./chunk-EDY4DXI5.js";
import {
  VIEM_SENTINEL_ADDRESS
} from "./chunk-IXDF7SOZ.js";
import {
  zeroAddress
} from "./chunk-VOPA75Q5.js";
import {
  parseAbi
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/common/getInstalledModules.ts
var getInstalledModules = async ({
  client,
  moduleAddress,
  moduleTypes = ["validator", "executor", "hook", "fallback"],
  pageSize = DEFAULT_QUERY_PAGE_SIZE
}) => {
  const modules = [];
  if (await isContract({ client, address: moduleAddress })) {
    for (const moduleType of moduleTypes) {
      switch (moduleType) {
        case "validator":
          const validators = await getModulesPaginated({
            client,
            functionName: "getValidatorPaginated",
            walletAddress: moduleAddress,
            pageSize
          });
          validators && modules.push(...validators);
          break;
        case "executor":
          const executors = await getModulesPaginated({
            client,
            functionName: "getExecutorsPaginated",
            walletAddress: moduleAddress,
            pageSize
          });
          executors && modules.push(...executors);
          break;
        case "hook":
          const activeHook = await client.readContract({
            address: moduleAddress,
            abi: parseAbi(accountAbi),
            functionName: "getActiveHook"
          });
          modules.push(activeHook);
          break;
        case "fallback":
      }
    }
  } else {
    throw new Error("Account has no init code and is not deployed");
  }
  const onlyModules = modules.filter((module) => module !== zeroAddress);
  const uniqueModules = Array.from(new Set(onlyModules));
  return uniqueModules;
};
var getModulesPaginated = async ({
  client,
  functionName,
  walletAddress,
  pageSize = DEFAULT_QUERY_PAGE_SIZE
}) => {
  const data = await client.readContract({
    address: walletAddress,
    abi: parseAbi(accountAbi),
    functionName,
    args: [VIEM_SENTINEL_ADDRESS, pageSize]
  });
  return data[0];
};

export {
  getInstalledModules,
  getModulesPaginated
};
//# sourceMappingURL=chunk-ACHZ4ZIC.js.map