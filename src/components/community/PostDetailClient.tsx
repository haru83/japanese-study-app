// src/components/community/PostDetailClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShibaAvatar } from "@/components/mascot/ShibaAvatar";
import { POST_CATEGORIES } from "@/components/community/PostCard";
import {
  toggleCommunityPostLike,
  addCommunityPostComment,
  deleteCommunityPostComment,
  deleteCommunityPost,
} from "@/actions/communityPost";
import { SocialProfileModal } from "@/components/community/SocialProfileModal";
import { ReportButton } from "@/components/community/ReportModal";
import { filterCommentInput, hasKorean } from "@/lib/japaneseInput";
import { ReactionPicker } from "@/components/community/ReactionPicker";
import { ReactionGroup, CommentWithReplies } from "@/lib/community";

interface CommentUser {
  id: string;
  name: string | null;
  isBot?: boolean;
  progress: { level: number; activeCharacter: string } | null;
  wardrobeItems: { wardrobeItemId: string }[];
}

export interface PostCommentItem {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  parentId?: string | null;
  user: CommentUser;
}

interface Props {
  post: {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: Date;
    userId: string;
    user: {
      id: string;
      name: string | null;
      progress: { level: number; activeCharacter: string } | null;
      wardrobeItems: { wardrobeItemId: string }[];
    };
    reactions?: ReactionGroup[];
    organizedComments?: CommentWithReplies<PostCommentItem>[];
    comments?: PostCommentItem[];
  };
  currentUserId?: string;
  isAdmin?: boolean;
}

export function PostDetailClient({ post, currentUserId, isAdmin }: Props) {
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // 댓글 입력 상태
  const [commentText, setCommentText] = useState("");
  const [koreanBlocked, setKoreanBlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 대댓글(답글) 입력 상태
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyKoreanBlocked, setReplyKoreanBlocked] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (hasKorean(raw)) {
      setKoreanBlocked(true);
      setCommentText(filterCommentInput(raw));
    } else {
      setKoreanBlocked(false);
      setCommentText(raw);
    }
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (hasKorean(raw)) {
      setReplyKoreanBlocked(true);
      setReplyText(filterCommentInput(raw));
    } else {
      setReplyKoreanBlocked(false);
      setReplyText(raw);
    }
  };

  const authorLevel = post.user.progress?.level ?? 1;
  const authorEquipped = post.user.wardrobeItems.map((w) => w.wardrobeItemId);
  const authorChar = post.user.progress?.activeCharacter ?? "shiba";
  const categoryInfo = POST_CATEGORIES[post.category] ?? POST_CATEGORIES.chat;

  const handleToggleReaction = async (targetId: string, emoji: string) => {
    await toggleCommunityPostLike(targetId, emoji);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) {
      router.push("/login");
      return;
    }
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await addCommunityPostComment(post.id, commentText.trim());
      setCommentText("");
      setKoreanBlocked(false);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "댓글 작성 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!currentUserId) {
      router.push("/login");
      return;
    }
    if (!replyText.trim()) return;

    setIsSubmittingReply(true);
    try {
      await addCommunityPostComment(post.id, replyText.trim(), parentId);
      setReplyText("");
      setReplyingToCommentId(null);
      setReplyKoreanBlocked(false);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "답글 작성 실패");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    try {
      await deleteCommunityPost(post.id);
      router.push("/community?tab=board");
    } catch (err) {
      alert(err instanceof Error ? err.message : "삭제 실패");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteCommunityPostComment(commentId);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "삭제 실패");
    }
  };

  // 계층형 댓글 목록
  const rootComments = post.organizedComments ?? [];
  const totalCommentsCount =
    post.comments?.length ??
    rootComments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0);

  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* 게시글 본문 카드 */}
      <div className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5">
        {/* 작성자 & 카테고리 헤더 */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-black/10">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedUserId(post.user.id)}
          >
            <ShibaAvatar
              characterId={authorChar}
              level={authorLevel}
              size={44}
              sticker
              equippedItemIds={authorEquipped}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-type-black hover:underline">
                  {post.user.name ?? "학습자"}
                </span>
                <span className="bg-grape-punch text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-black">
                  Lv.{authorLevel}
                </span>
              </div>
              <span className="text-xs text-type-black/50 font-bold">
                {new Date(post.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-black px-3 py-1 rounded-full border-2 border-black ${categoryInfo.bg} ${categoryInfo.text}`}
            >
              {categoryInfo.label}
            </span>

            {/* 본인 또는 관리자 삭제 버튼 */}
            {(currentUserId === post.userId || isAdmin) && (
              <button
                onClick={handleDeletePost}
                className="text-xs font-bold text-red-500 hover:text-red-700 p-1"
                title="게시글 삭제"
              >
                삭제
              </button>
            )}
          </div>
        </div>

        {/* 게시글 제목 & 본문 */}
        <h1 className="font-black text-type-black text-lg mb-3 leading-snug">
          {post.title}
        </h1>
        <p className="text-sm font-bold text-type-black/90 leading-relaxed whitespace-pre-wrap mb-6">
          {post.content}
        </p>

        {/* 하단 다양한 이모지 리액션 & 신고 영역 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t-2 border-black/10">
          <ReactionPicker
            targetId={post.id}
            reactions={post.reactions ?? []}
            onToggle={handleToggleReaction}
            currentUserId={currentUserId}
          />

          {currentUserId && currentUserId !== post.userId && (
            <div className="self-end sm:self-auto">
              <ReportButton targetType="post" targetId={post.id} />
            </div>
          )}
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="bg-paper-white rounded-[20px] border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5">
        <h3 className="font-black text-type-black text-sm mb-3">
          댓글 💬 ({totalCommentsCount})
        </h3>

        {/* 댓글 입력창 */}
        {currentUserId ? (
          <div className="flex flex-col gap-1 mb-5">
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={handleCommentChange}
                placeholder="日本語または英語でコメントを入力 🌸"
                maxLength={500}
                className={`flex-1 px-3.5 py-2.5 bg-canvas-almond/20 border-2 rounded-xl text-xs font-bold text-type-black focus:outline-none focus:bg-white ${koreanBlocked ? "border-red-400" : "border-black"}`}
              />
              <button
                type="submit"
                disabled={isSubmitting || !commentText.trim()}
                className="px-4 py-2.5 bg-sakura-pink text-type-black font-black text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] disabled:opacity-50 shrink-0"
              >
                登録
              </button>
            </form>
            {koreanBlocked && (
              <p className="text-[11px] font-bold text-red-500 px-1">
                ⚠️ このコメント欄では日本語・英語のみ入力できます
              </p>
            )}
          </div>
        ) : (
          <div className="p-3 bg-canvas-almond/30 rounded-xl border border-black/20 text-center text-xs font-bold text-type-black/60 mb-4">
            댓글을 남기려면 로그인이 필요합니다.
          </div>
        )}

        {/* 계층형 댓글 & 대댓글 목록 */}
        <div className="flex flex-col gap-3">
          {rootComments.length === 0 ? (
            <p className="text-center py-6 text-xs font-bold text-type-black/40">
              아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!
            </p>
          ) : (
            rootComments.map((comment) => {
              const cLevel = comment.user.progress?.level ?? 1;
              const cEquipped = comment.user.wardrobeItems.map((w) => w.wardrobeItemId);
              const cChar = comment.user.progress?.activeCharacter ?? "shiba";
              const isReplying = replyingToCommentId === comment.id;

              return (
                <div key={comment.id} className="flex flex-col gap-2">
                  {/* 부모 댓글 카드 */}
                  <div className="bg-canvas-almond/20 rounded-xl p-3 border-2 border-black/10 flex items-start gap-2.5">
                    <div
                      className="cursor-pointer shrink-0 mt-0.5"
                      onClick={() => setSelectedUserId(comment.user.id)}
                    >
                      <ShibaAvatar
                        characterId={cChar}
                        level={cLevel}
                        size={32}
                        sticker
                        equippedItemIds={cEquipped}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-black text-xs text-type-black hover:underline cursor-pointer"
                            onClick={() => setSelectedUserId(comment.user.id)}
                          >
                            {comment.user.name ?? "학습자"}
                          </span>
                          <span className="bg-grape-punch text-white text-[8px] font-black px-1.5 py-0.2 rounded-full border border-black">
                            Lv.{cLevel}
                          </span>
                        </div>
                        <span className="text-[10px] text-type-black/40 font-bold">
                          {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-type-black/90 whitespace-pre-wrap leading-relaxed mb-2">
                        {comment.content}
                      </p>

                      {/* 액션 버튼 (답글 달기 & 삭제) */}
                      <div className="flex items-center gap-3">
                        {currentUserId && (
                          <button
                            type="button"
                            onClick={() => {
                              if (isReplying) {
                                setReplyingToCommentId(null);
                                setReplyText("");
                              } else {
                                setReplyingToCommentId(comment.id);
                                setReplyText("");
                              }
                            }}
                            className="text-[11px] font-black text-type-black/70 hover:text-sakura-pink flex items-center gap-1 transition-colors"
                          >
                            <span>💬</span>
                            <span>{isReplying ? "답글 취소" : "답글달기"}</span>
                          </button>
                        )}

                        {(currentUserId === comment.userId || isAdmin) && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-[10px] font-bold text-red-500 hover:text-red-700"
                          >
                            삭제
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 인라인 대댓글 작성 폼 */}
                  {isReplying && currentUserId && (
                    <div className="ml-6 pl-3 border-l-2 border-sakura-pink/50">
                      <form
                        onSubmit={(e) => handleReplySubmit(e, comment.id)}
                        className="bg-paper-white p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex flex-col gap-1.5"
                      >
                        <div className="text-[10px] font-black text-type-black/60 flex items-center gap-1">
                          <span>↳</span>
                          <span>@{comment.user.name ?? "학습자"}님에게 답글 작성</span>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={handleReplyChange}
                            placeholder="日本語または英語で返信を入力 🌸"
                            maxLength={500}
                            autoFocus
                            className={`flex-1 px-3 py-1.5 bg-canvas-almond/20 border-2 rounded-xl text-xs font-bold text-type-black focus:outline-none focus:bg-white ${replyKoreanBlocked ? "border-red-400" : "border-black"}`}
                          />
                          <button
                            type="submit"
                            disabled={isSubmittingReply || !replyText.trim()}
                            className="px-3 py-1.5 bg-sakura-pink text-type-black font-black text-xs rounded-xl border-2 border-black shadow-[1px_1px_0px_0px_#000] disabled:opacity-50 shrink-0"
                          >
                            返信
                          </button>
                        </div>
                        {replyKoreanBlocked && (
                          <p className="text-[10px] font-bold text-red-500 px-1">
                            ⚠️ 日本語または英語のみ入力できます
                          </p>
                        )}
                      </form>
                    </div>
                  )}

                  {/* 대댓글(답글) 목록 렌더링 */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-6 pl-3 border-l-2 border-black/15 flex flex-col gap-2">
                      {comment.replies.map((reply) => {
                        const rLevel = reply.user.progress?.level ?? 1;
                        const rEquipped = reply.user.wardrobeItems.map((w) => w.wardrobeItemId);
                        const rChar = reply.user.progress?.activeCharacter ?? "shiba";

                        return (
                          <div
                            key={reply.id}
                            className="bg-paper-white rounded-xl p-2.5 border-2 border-black/10 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.05)] flex items-start gap-2"
                          >
                            <span className="text-type-black/40 font-bold text-xs mt-0.5">↳</span>
                            <div
                              className="cursor-pointer shrink-0 mt-0.5"
                              onClick={() => setSelectedUserId(reply.user.id)}
                            >
                              <ShibaAvatar
                                characterId={rChar}
                                level={rLevel}
                                size={26}
                                sticker
                                equippedItemIds={rEquipped}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="font-black text-[11px] text-type-black hover:underline cursor-pointer"
                                    onClick={() => setSelectedUserId(reply.user.id)}
                                  >
                                    {reply.user.name ?? "학습자"}
                                  </span>
                                  <span className="bg-grape-punch text-white text-[8px] font-black px-1.5 py-0.2 rounded-full border border-black">
                                    Lv.{rLevel}
                                  </span>
                                </div>
                                <span className="text-[9px] text-type-black/40 font-bold">
                                  {new Date(reply.createdAt).toLocaleDateString("ko-KR")}
                                </span>
                              </div>

                              <p className="text-xs font-bold text-type-black/90 whitespace-pre-wrap leading-relaxed">
                                {reply.content}
                              </p>
                            </div>

                            {(currentUserId === reply.userId || isAdmin) && (
                              <button
                                onClick={() => handleDeleteComment(reply.id)}
                                className="text-[10px] font-bold text-red-500 hover:text-red-700 shrink-0 ml-1"
                              >
                                삭제
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 프로필 모달 */}
      <SocialProfileModal
        targetUserId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />
    </div>
  );
}

