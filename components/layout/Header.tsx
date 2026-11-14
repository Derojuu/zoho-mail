import React from "react";
import GlobalHeader from "./GlobalHeader";
import ProductHeader from "./ProductHeader";

export default function Header() {
  return (
    <header style={{ "--zh-header-height": "143px" } as React.CSSProperties}>
      <GlobalHeader />
      <ProductHeader />
    </header>
  );
}
