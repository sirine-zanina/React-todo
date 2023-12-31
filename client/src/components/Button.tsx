import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
  // button types for priority
  high: "high",
  medium: "medium",
  low: "low",
};
type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof buttonTypes;
  type?: "button" | "submit";
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
};

const Button = ({ children, variant, type, style, ...rest }: ButtonProps) => {
  let styleClass =
    variant === "high" || variant === "medium" || variant === "low"
      ? styles.priorityButton
      : styles.button;

  return (
    <button
      className={getClasses(
        styleClass,
        styles[`button--${buttonTypes[variant as keyof typeof buttonTypes]}`]
      )}
      type={type === "submit" ? "submit" : "button"}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

type SelectButtonProps = {
  children: React.ReactNode;
  id: string;
  value?: string | string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectButton({ children, id, ...rest }: SelectButtonProps) {
  return (
    <select
      className={getClasses(styles.button, styles.button__select)}
      id={id}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
