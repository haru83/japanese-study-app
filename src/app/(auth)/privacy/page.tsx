import Link from "next/link";

export default function PrivacyPage() {
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
          <h1 className="text-xl font-black text-type-black">개인정보 처리방침 🔒</h1>
          <p className="text-xs font-bold text-type-black/60">왕왕 일본어 개인정보 보호 정책</p>
        </div>
      </header>

      {/* Content Card */}
      <div className="bg-paper-white rounded-[20px] border-2 border-black shadow-[6px_6px_0px_0px_#000] p-6 space-y-6 text-sm text-type-black font-medium leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>🛡️</span> 1. 개인정보 수집 항목 및 목적
          </h2>
          <p className="text-xs text-type-black/80 font-bold">
            &quot;왕왕 일본어&quot;는 서비스 제공 및 사용자 식별을 위해 최소한의 개인정보만을 수집합니다:
          </p>
          <div className="bg-canvas-almond/70 rounded-xl p-3 border border-black/10 text-xs space-y-1 font-bold">
            <p>• <strong>이메일 가입</strong>: 이메일 주소, 닉네임, 비밀번호(암호화 저장)</p>
            <p>• <strong>Google 소셜 로그인</strong>: Google 계정 이메일, 기본 프로필 이름</p>
            <p>• <strong>서비스 이용 과정 생성 정보</strong>: 학습 진도, 일기, 게시글, 댓글, 접속 로그</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>⏳</span> 2. 개인정보 보유 및 이용 기간
          </h2>
          <ul className="text-xs text-type-black/80 font-bold space-y-1.5 list-disc list-inside">
            <li>회원 탈퇴 시까지 보유하며, 회원 탈퇴 즉시 모든 개인정보는 안전하게 파기됩니다.</li>
            <li>단, 관계 법령에 의해 보존이 필요한 경우 법령이 정한 기간 동안 보관합니다.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>🤝</span> 3. 제3자 제공 및 위탁
          </h2>
          <p className="text-xs text-type-black/80 font-bold">
            서비스는 사용자의 사전 동의 없이 개인정보를 제3자에게 제공하거나 판매하지 않습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>🍪</span> 4. 쿠키(Cookie) 및 세션 운용
          </h2>
          <p className="text-xs text-type-black/80 font-bold">
            안전한 로그인 상태 유지와 서비스 편의 제공을 위해 세션 토큰(JWT)과 필수 쿠키만을 사용하며, 사용자는 브라우저 설정을 통해 저장을 거부할 수 있습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-type-black flex items-center gap-2">
            <span>📞</span> 5. 개인정보 보호책임자 및 문의
          </h2>
          <p className="text-xs text-type-black/80 font-bold">
            개인정보 처리 및 보호와 관련된 문의사항은 관리자 이메일(<code>admin@wangwang.app</code>)로 문의해 주시기 바랍니다.
          </p>
        </section>

        <div className="pt-4 border-t border-black/10 text-center">
          <p className="text-[11px] font-bold text-type-black/50">공고일자: 2026년 8월 18일 / 시행일자: 2026년 8월 18일</p>
        </div>
      </div>
    </div>
  );
}
