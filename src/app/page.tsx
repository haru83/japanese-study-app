import Link from "next/link";
import Image from "next/image";

export default function SplashPage() {
  return (
    <div className="flex flex-col h-full min-h-screen justify-between items-center relative w-full">
      {/* Background blobs */}
      <div className="absolute top-[-5%] right-[-15%] w-[80%] aspect-square bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-[15%] left-[-10%] w-[60%] aspect-square bg-orange-300/10 rounded-full blur-3xl pointer-events-none opacity-60" />

      {/* Header */}
      <header className="flex w-full items-center justify-center pt-10 pb-2 z-10 px-6">
        <div className="flex items-center gap-2 opacity-90">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            translate
          </span>
          <span className="text-lg font-bold tracking-tight text-text-main dark:text-text-main-dark">
            다이어리 일본어
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 w-full z-10">
        {/* Shiba mascot */}
        <div className="flex w-full justify-center mb-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square border-2 border-dashed border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="w-full max-w-[280px] aspect-square relative z-10">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoGThRVUtSlNCmO0-rZs_NaFGiY5R1ERwMyydITwFLVTG8OVNdk2cPdtKrcwnh5r_0Z1Hys7T3miiUVV_2eR4NxYYmkpuiTIqUXrtPuFLMzIpEnvnWx9wK2Fp5_xYwS5SrNoBSToMmneFL_QcdCpR7EvTFum-q-Nm3ma1EH5ZI-o0vi0CWAWDhVn_6MYZjJDqze6qc2IKLTCEVnkkk7_G7i9T159ySdP_1-3-WUZUQXFR8z5ce-P3m3XPcM93R5OQIRCO1l1X5sQ7N"
              alt="Shiba Inu"
              fill
              className="object-contain hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-4">
          <h2 className="text-text-main dark:text-text-main-dark tracking-tight text-[28px] font-bold leading-[1.2]">
            일기로 배우는
            <br />
            쉬운 일본어
          </h2>
          <p className="text-text-sub dark:text-text-sub-dark text-sm font-medium">
            일기 쓰기 + 30가지 경어 레슨
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 pb-12 pt-4 z-10 flex flex-col items-center">
        <Link
          href="/login?mode=signup"
          className="w-full group relative flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 h-[60px] rounded-full shadow-[0_4px_0_0_#d97706] hover:shadow-[0_2px_0_0_#d97706] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] mb-4"
        >
          <span className="material-symbols-outlined text-text-main text-2xl">mail</span>
          <span className="text-text-main text-[18px] font-bold tracking-tight">
            이메일로 가입하기
          </span>
        </Link>
        <div className="flex justify-center items-center text-center px-4 mb-2">
          <p className="text-[15px] font-medium text-text-sub dark:text-text-sub-dark">
            이미 계정이 있으신가요?&nbsp;
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
        <p className="text-xs text-text-sub/50 dark:text-text-sub-dark/50 text-center mt-2">
          가입함으로써 이용약관에 동의하게 됩니다
        </p>
      </footer>
    </div>
  );
}
