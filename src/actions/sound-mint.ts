import {
  FilterType,
  ActionStep,
  SignatureType,
  PrimitiveType,
  ActionClaimant,
  anyActionParameter,
} from "@boostxyz/sdk";
import signatures from "@boostxyz/signatures" assert { type: "json" };
import { Address, Hex, toHex } from "viem";
import { base } from "viem/chains";

const targetContract = "0x000000000001A36777f9930aAEFf623771b13e70"; // SuperMinter V2
const mintToSelector = signatures.functions.selectors[
  "mintTo((address,uint8,uint8,address,uint32,address,uint32,bytes32[],uint96,uint32,uint32,uint32,bytes,address,bytes32[],uint256))"
] as Hex;
export const mintEventSelector = signatures.events.selectors["Minted(uint8,address,uint256,uint256)"] as Hex;

export function createSoundMintPayload(collectionAddress: Address) {
  const mintToActionStep: ActionStep = {
    chainid: base.id,
    signature: mintToSelector,
    signatureType: SignatureType.FUNC,
    targetContract: targetContract,
    actionParameter: anyActionParameter(),
  };

  const quantityActionStep: ActionStep = {
    chainid: base.id,
    signature: mintEventSelector,
    signatureType: SignatureType.EVENT,
    targetContract: collectionAddress,
    actionParameter: {
      filterType: FilterType.GREATER_THAN_OR_EQUAL,
      fieldType: PrimitiveType.UINT,
      fieldIndex: 2, // quantity
      filterData: toHex(1, { size: 1 }),
    },
  };

  const actionClaimant: ActionClaimant = {
    chainid: base.id,
    signature: mintEventSelector,
    signatureType: SignatureType.EVENT,
    targetContract: collectionAddress,
    fieldIndex: 1, // to
  };

  return {
    actionClaimant,
    actionSteps: [mintToActionStep, quantityActionStep],
  };
}
