export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function simulateNetworkDelay(
  baseMs: number = 1000,
  variationMs: number = 500
): Promise<void> {
  const delay = baseMs + Math.random() * variationMs;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
