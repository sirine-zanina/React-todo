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

function SelectButton({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <select
      className={getClasses(styles.button, styles.button__select)}
      id={id}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
