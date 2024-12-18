import {
  DeployableOptions,
  EventActionPayload,
  BoostCore,
  ManagedBudget,
  Incentive,
} from "@boostxyz/sdk";

export async function deployBoost(
  core: BoostCore,
  budget: ManagedBudget,
  actionPayload: EventActionPayload,
  incentive: Incentive,
  options?: DeployableOptions
) {
  console.log("deploying boost");

  const action = core.EventAction(actionPayload);

  const boost = await core.createBoost({
    maxParticipants: 5000n,
    budget,
    action,
    allowList: core.OpenAllowList(),
    incentives: [incentive],
  }, options);

  console.log("boost deployed: ", boost.id);

  return boost;
}
