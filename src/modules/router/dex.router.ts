import { MockDexRouter } from "./mock.dex";

export class DexRouter {
  private dex = new MockDexRouter();

  async route() {
    const [r, m] = await Promise.all([
      this.dex.getRaydiumQuote(),
      this.dex.getMeteoraQuote()
    ]);

    return r.price > m.price ? r : m;
  }

  async execute(dex: string) {
    return this.dex.executeSwap(dex);
  }
}
