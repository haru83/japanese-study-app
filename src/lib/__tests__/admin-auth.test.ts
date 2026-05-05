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

  it("/api/admin은 admin 경로가 아니다 (루트가 /admin이 아님)", () => {
    expect(isAdminPath("/api/admin")).toBe(false);
  });

  it("빈 문자열은 admin 경로가 아니다", () => {
    expect(isAdminPath("")).toBe(false);
  });

  // ── 추가 엣지 케이스 ───────────────────────────────

  it("/admin/은 admin 경로다 (후행 슬래시)", () => {
    expect(isAdminPath("/admin/")).toBe(true);
  });

  it("/admin/users/123/edit은 admin 경로다 (깊은 경로)", () => {
    expect(isAdminPath("/admin/users/123/edit")).toBe(true);
  });

  it("/Admin은 admin 경로가 아니다 (대소문자 구분)", () => {
    expect(isAdminPath("/Admin")).toBe(false);
  });

  it("/adminSettings는 admin 경로가 아니다 (/admin/ 슬래시 없으면 제외)", () => {
    expect(isAdminPath("/adminSettings")).toBe(false);
  });

  it("루트 /는 admin 경로가 아니다", () => {
    expect(isAdminPath("/")).toBe(false);
  });

  it("/diary는 admin 경로가 아니다", () => {
    expect(isAdminPath("/diary")).toBe(false);
  });

  it("/keigo는 admin 경로가 아니다", () => {
    expect(isAdminPath("/keigo")).toBe(false);
  });

  it("admin이 포함된 쿼리스트링 경로도 /admin 시작이면 true", () => {
    expect(isAdminPath("/admin?tab=users")).toBe(true);
  });
});
