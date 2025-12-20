export type OrderStatus =
  | "pending"
  | "routing"
  | "building"
  | "submitted"
  | "confirmed"
  | "failed";

export interface OrderPayload {
  tokenIn: string;
  tokenOut: string;
  amount: number;
}
