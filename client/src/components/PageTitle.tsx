import React from "react";
import style from "../styles/modules/title.module.scss";

type PageTitleProps = {
  children: React.ReactNode;
};

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <p className={style.title}>{children}</p>
  );
}
