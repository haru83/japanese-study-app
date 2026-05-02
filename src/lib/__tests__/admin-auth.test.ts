import { describe, it, expect } from "vitest";
import { isAdminPath } from "@/lib/admin-auth";

describe("isAdminPath", () => {
  it("/admin/dashboard는 admin 경로다", () => {
    expect(isAdminPath("/admin/dashboard")).toBe(true);
  });

  it("/admin은 admin 경로다", () => {
    expect(isAdminPath("/admin")).toBe(true);
  });

  it("/home은 admin 경로가 아니다", () => {
    expect(isAdminPath("/home")).toBe(false);
  });

  it("/admin/api/data는 admin 경로다", () => {
    expect(isAdminPath("/admin/api/data")).toBe(true);
  });

  it("/api/admin은 admin 경로가 아니다 (루트가 /admin이 아님)", () => {
    expect(isAdminPath("/api/admin")).toBe(false);
  });

  it("빈 문자열은 admin 경로가 아니다", () => {
    expect(isAdminPath("")).toBe(false);
  });
});
