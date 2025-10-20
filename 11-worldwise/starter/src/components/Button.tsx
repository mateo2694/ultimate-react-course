import type { ReactNode } from "react";
import styles from "./Button.module.css";

export function Button({
  type,
  onClick,
  children,
}: {
  type: "primary" | "back" | "position";
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
