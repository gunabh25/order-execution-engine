export const orderSchema = {
  description: "Execute a market order",
  tags: ["Orders"],

  body: {
    type: "object",
    required: ["tokenIn", "tokenOut", "amount"],
    properties: {
      tokenIn: { type: "string" },
      tokenOut: { type: "string" },
      amount: { type: "number", minimum: 0 }
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
