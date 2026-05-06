// src/lib/__tests__/community.test.ts
import { describe, it, expect } from "vitest";
import { filterPublicDiaries, filterBlockedUsers } from "@/lib/community";

describe("filterPublicDiaries", () => {
  it("isPublic=false 일기를 제거한다", () => {
    const input = [{ isPublic: false }, { isPublic: true }];
    expect(filterPublicDiaries(input)).toEqual([{ isPublic: true }]);
  });

  it("모두 비공개이면 빈 배열을 반환한다", () => {
    expect(filterPublicDiaries([{ isPublic: false }])).toEqual([]);
  });

  it("빈 배열 입력 시 빈 배열 반환", () => {
    expect(filterPublicDiaries([])).toEqual([]);
  });

  it("모두 공개이면 모두 반환한다", () => {
    const input = [{ isPublic: true }, { isPublic: true }];
    expect(filterPublicDiaries(input)).toHaveLength(2);
  });
});

describe("filterBlockedUsers", () => {
  it("차단된 userId의 아이템을 제거한다", () => {
    const items = [{ userId: "a" }, { userId: "b" }, { userId: "c" }];
    expect(filterBlockedUsers(items, ["b"])).toEqual([{ userId: "a" }, { userId: "c" }]);
  });

  it("차단 목록이 비어 있으면 모두 반환한다", () => {
    const items = [{ userId: "a" }, { userId: "b" }];
    expect(filterBlockedUsers(items, [])).toEqual(items);
  });

  it("모두 차단된 경우 빈 배열 반환", () => {
    expect(filterBlockedUsers([{ userId: "a" }], ["a"])).toEqual([]);
  });

  it("여러 userId를 동시에 차단할 수 있다", () => {
    const items = [{ userId: "a" }, { userId: "b" }, { userId: "c" }];
    expect(filterBlockedUsers(items, ["a", "c"])).toEqual([{ userId: "b" }]);
  });
});
