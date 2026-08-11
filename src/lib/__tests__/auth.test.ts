import { describe, it, expect } from "vitest";
import { authOptions } from "@/lib/auth";

describe("NextAuth authOptions Google Config", () => {
  it("GoogleProvider가 authOptions.providers에 포함되어 있어야 함", () => {
    const googleProvider = authOptions.providers.find(
      (p) => p.id === "google"
    );
    expect(googleProvider).toBeDefined();
  });

  it("events.createUser 콜백이 정의되어 있어야 함", () => {
    expect(authOptions.events?.createUser).toBeDefined();
  });
});
