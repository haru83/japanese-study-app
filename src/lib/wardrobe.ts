export function canPurchaseItem(params: {
  userStamps: number;
  userLevel: number;
  stampCost: number;
  requiredLevel: number;
}): boolean {
  return params.userStamps >= params.stampCost && params.userLevel >= params.requiredLevel;
}
