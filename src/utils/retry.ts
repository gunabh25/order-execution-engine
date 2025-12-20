// src/utils/retry.ts
export async function retry(fn: Function, retries = 3) {
  let delay = 500;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch {
      if (i === retries - 1) throw new Error("Execution failed");
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
}
