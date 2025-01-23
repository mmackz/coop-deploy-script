import {
  FilterType,
  ActionStep,
  SignatureType,
  PrimitiveType,
  ActionClaimant,
  packFieldIndexes,
} from "@boostxyz/sdk";
import signatures from "@boostxyz/signatures" assert { type: "json" };
import { Address, Hex, toHex } from "viem";
import { base } from "viem/chains";

const superMinterContract = "0x000000000001A36777f9930aAEFf623771b13e70"; // SuperMinter V2
const mintToSelector = signatures.functions.selectors[
  "mintTo((address,uint8,uint8,address,uint32,address,uint32,bytes32[],uint96,uint32,uint32,uint32,bytes,address,bytes32[],uint256))"
] as Hex;
export const mintEventSelector = signatures.events.selectors["Minted(uint8,address,uint256,uint256)"] as Hex;
const affiliateAddress = "0x512b55b00d744fc2edb8474f223a7498c3e5a7ce";

export function createSoundMintPayload(collectionAddress: Address) {
  const editionActionStep: ActionStep = {
    chainid: base.id,
    signature: mintToSelector,
    targetContract: superMinterContract,
    actionParameter: {
      filterType: FilterType.EQUAL,
      fieldType: PrimitiveType.TUPLE,
      fieldIndex: packFieldIndexes([0, 0]), // p.edition
      filterData: collectionAddress,
    },
  };

  const quantityActionStep: ActionStep = {
    chainid: base.id,
    signature: mintToSelector,
    targetContract: superMinterContract,
    actionParameter: {
      filterType: FilterType.GREATER_THAN_OR_EQUAL,
      fieldType: PrimitiveType.TUPLE,
      fieldIndex: packFieldIndexes([0, 4]), // p.quantity
      filterData: toHex(1),
    },
  };

  const affiliateActionStep: ActionStep = {
    chainid: base.id,
    signature: mintToSelector,
    targetContract: superMinterContract,
    actionParameter: {
      filterType: FilterType.EQUAL,
      fieldType: PrimitiveType.TUPLE,
      fieldIndex: packFieldIndexes([0, 13]), // p.affiliate
      filterData: affiliateAddress,
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
    actionSteps: [editionActionStep, quantityActionStep, affiliateActionStep],
  };
}
