import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost-light";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#2563eb] text-white shadow-[0_0_34px_rgba(37,99,235,0.42)] hover:scale-105 hover:bg-white hover:text-black",
  secondary: "border border-white/20 text-white hover:bg-white hover:text-black",
  "ghost-light": "border border-white/30 text-white hover:bg-white/10",
};

const baseClasses =
  "cursor-hover inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black";

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
