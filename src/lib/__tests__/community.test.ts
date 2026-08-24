// src/lib/__tests__/community.test.ts
import { describe, it, expect } from "vitest";
import {
  filterPublicDiaries,
  filterBlockedUsers,
  groupReactions,
  organizeCommentsWithReplies,
} from "@/lib/community";

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

describe("groupReactions", () => {
  it("이모지별로 올바르게 카운트하고 현재 유저의 반응 여부를 표시한다", () => {
    const likes = [
      { emoji: "👍", userId: "user1" },
      { emoji: "👍", userId: "user2" },
      { emoji: "❤️", userId: "user1" },
      { emoji: "😂", userId: "user3" },
    ];

    const result = groupReactions(likes, "user1");

    expect(result).toEqual([
      { emoji: "👍", count: 2, hasReacted: true },
      { emoji: "❤️", count: 1, hasReacted: true },
      { emoji: "😂", count: 1, hasReacted: false },
      { emoji: "😢", count: 0, hasReacted: false },
      { emoji: "🌸", count: 0, hasReacted: false },
      { emoji: "🔥", count: 0, hasReacted: false },
    ]);
  });

  it("반응이 없을 때 모든 기본 이모지의 카운트가 0이다", () => {
    const result = groupReactions([], "user1");
    expect(result.every((r) => r.count === 0 && !r.hasReacted)).toBe(true);
    expect(result).toHaveLength(6);
  });
});

describe("organizeCommentsWithReplies", () => {
  it("부모 댓글과 대댓글을 올바르게 계층 트리로 구성한다", () => {
    const now = new Date();
    const comments = [
      { id: "c1", parentId: null, content: "부모1", createdAt: new Date(now.getTime() - 1000) },
      { id: "c2", parentId: null, content: "부모2", createdAt: now },
      { id: "r1", parentId: "c1", content: "답글1-1", createdAt: new Date(now.getTime() - 500) },
      { id: "r2", parentId: "c1", content: "답글1-2", createdAt: now },
      { id: "r3", parentId: "c2", content: "답글2-1", createdAt: now },
    ];

    const organized = organizeCommentsWithReplies(comments);

    expect(organized).toHaveLength(2);
    expect(organized[0].id).toBe("c1");
    expect(organized[0].replies).toHaveLength(2);
    expect(organized[0].replies[0].id).toBe("r1");
    expect(organized[0].replies[1].id).toBe("r2");
    expect(organized[1].id).toBe("c2");
    expect(organized[1].replies).toHaveLength(1);
    expect(organized[1].replies[0].id).toBe("r3");
  });
});

