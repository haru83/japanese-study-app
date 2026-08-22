import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-sakura-blush px-5 pt-8 pb-20 max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Link
          href="/login"
          className="p-2 rounded-full border-2 border-black bg-paper-white shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all shrink-0"
          aria-label="로그인 화면으로 돌아가기"
        >
          <span className="material-symbols-outlined text-type-black text-xl leading-none block">
            arrow_back
          </span>
        </Link>
        <div>
          <h1 className="text-xl font-black text-type-black">서비스 이용약관 📜</h1>
          <p className="text-xs font-bold text-type-black/60">왕왕 일본어 서비스 이용 약관</p>
        </div>
      </header>

      {/* Content Card */}
      <div className="bg-paper-white rounded-[20px] border-2 border-black shadow-[6px_6px_0px_0px_#000] p-6 space-y-6 text-sm text-type-black font-medium leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>🌸</span> 제1조 (목적)
          </h2>
          <p className="text-xs text-type-black/80 font-bold">
            본 약관은 &quot;왕왕 일본어&quot;(이하 &quot;서비스&quot;)가 제공하는 일본어 학습 및 커뮤니티 서비스의 이용조건 및 절차, 회원과 서비스 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>👤</span> 제2조 (회원가입 및 계정 관리)
          </h2>
          <ul className="text-xs text-type-black/80 font-bold space-y-1.5 list-disc list-inside">
            <li>회원은 이메일 또는 소셜 로그인(Google)을 통해 가입할 수 있습니다.</li>
            <li>회원은 본인의 계정 정보를 성실히 관리해야 하며, 타인에게 양도 또는 대여할 수 없습니다.</li>
            <li>타인의 정보를 도용하여 가입한 경우 서비스 이용이 제한되거나 계정이 삭제될 수 있습니다.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>💬</span> 제3조 (커뮤니티 및 게시물 운영 정책)
          </h2>
          <ul className="text-xs text-type-black/80 font-bold space-y-1.5 list-disc list-inside">
            <li>회원은 공개 일기 및 자유게시판을 통해 다른 학습자와 자유롭게 소통할 수 있습니다.</li>
            <li>욕설, 비방, 음란물, 상업적 광고, 스팸 등 타인에게 불쾌감을 주는 게시글 및 댓글은 경고 없이 숨김 또는 삭제 처리될 수 있습니다.</li>
            <li>반복적인 운영 정책 위반 시 서비스 이용이 영구 정지될 수 있습니다.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>🎮</span> 제4조 (학습 기록 및 가상 재화)
          </h2>
          <p className="text-xs text-type-black/80 font-bold">
            서비스 내에서 지급되는 경험치(XP), 스트릭, 스탬프 및 옷장 아이템 등은 서비스 내에서만 사용 가능하며 현금이나 다른 재화로 교환 또는 환불되지 않습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>⚖️</span> 제5조 (서비스의 변경 및 중단)
          </h2>
          <p className="text-xs text-type-black/80 font-bold">
            서비스는 지속적이고 안정적인 운영을 위해 시스템 점검, 개선 및 불가피한 사유 발생 시 서비스의 일부 또는 전부를 수정하거나 중단할 수 있습니다.
          </p>
        </section>

        <div className="pt-4 border-t border-black/10 text-center">
          <p className="text-[11px] font-bold text-type-black/50">시행일자: 2026년 8월 18일</p>
        </div>
      </div>
    </div>
  );
}
