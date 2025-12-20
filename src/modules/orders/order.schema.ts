export const orderSchema = {
  body: {
    type: "object",
    required: ["tokenIn", "tokenOut", "amount"],
    properties: {
      tokenIn: { type: "string", example: "SOL" },
      tokenOut: { type: "string", example: "USDC" },
      amount: { type: "number", example: 1 }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        orderId: { type: "string" }
      }
    }
  }
};
