import { sleep } from "../../utils/sleep";

const basePrice = 100;

export class MockDexRouter {
  async getRaydiumQuote() {
    await sleep(200);
    return { dex: "raydium", price: basePrice * (0.98 + Math.random() * 0.04) };
  }

  async getMeteoraQuote() {
    await sleep(200);
    return { dex: "meteora", price: basePrice * (0.97 + Math.random() * 0.05) };
  }

  async executeSwap(dex: string) {
    await sleep(2000 + Math.random() * 1000);
    return {
      txHash: `0xMOCK_${Math.random().toString(36).slice(2)}`,
      executedPrice: basePrice
    };
  }
}
