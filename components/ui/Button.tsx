import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost-light";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#2563eb] text-white hover:bg-white hover:text-black",
  secondary: "border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white",
  "ghost-light": "text-[#2563eb] hover:bg-[#2563eb]/10",
};

const baseClasses =
  "cursor-hover inline-flex min-h-12 items-center justify-center gap-2 rounded-none px-6 py-3 text-sm font-bold transition duration-300 shadow-[0_0_34px_rgba(37,99,235,0.42)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({ children, href, variant = "primary", className = "", ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
