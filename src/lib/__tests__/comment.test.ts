// src/lib/__tests__/comment.test.ts
import { describe, it, expect } from "vitest";
import { validateCommentContent, assertCommentOwner } from "@/lib/community";

describe("validateCommentContent", () => {
  it("빈 문자열은 에러를 던진다", () => {
    expect(() => validateCommentContent("")).toThrow("댓글 내용을 입력해주세요");
  });

  it("공백만 있는 경우 에러를 던진다", () => {
    expect(() => validateCommentContent("   ")).toThrow("댓글 내용을 입력해주세요");
  });

  it("정상 내용은 trim된 문자열을 반환한다", () => {
    expect(validateCommentContent("  응원해요  ")).toBe("응원해요");
  });

  it("일본어 댓글도 통과한다", () => {
    expect(validateCommentContent("いいですね！")).toBe("いいですね！");
  });
});

describe("assertCommentOwner", () => {
  it("같은 userId이면 에러 없음", () => {
    expect(() => assertCommentOwner("user1", "user1")).not.toThrow();
  });

  it("다른 userId이면 에러를 던진다", () => {
    expect(() => assertCommentOwner("user1", "user2")).toThrow(
      "본인 댓글만 삭제할 수 있어요"
    );
  });
});
