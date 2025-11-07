import type { ReactNode } from "react";

export interface HeaderProps {
  step: number;
  prevStep?: () => void;
  selectedRole?: string;
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  suggestions?: { title: string }[];
  onComplete?: (value: string) => void; // 👈 new prop
}

export interface SelectProps {
  options?: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
