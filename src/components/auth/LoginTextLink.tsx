import Link from "next/link";

interface LoginTextLinkProps {
  href: string;
  text: string;
  linkText: string;
}

export function LoginTextLink({ href, text, linkText }: LoginTextLinkProps) {
  return (
    <p className="text-center text-sm text-text-sub dark:text-text-sub-dark">
      {text}{" "}
      <Link
        href={href}
        className="text-primary hover:text-primary-hover font-semibold underline underline-offset-2"
      >
        {linkText}
      </Link>
    </p>
  );
}
