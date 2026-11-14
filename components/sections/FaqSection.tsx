"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/constants";
import { cn } from "@/utils";

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "faq-1": true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="zwc-faq-section zwc-section-space">
      <div className="content-wrap bottom-animated middle-animated animated">
        <div className="zwc-faq-content-box">
          <h2 className="zwc-faq-heading">Frequently Asked Questions</h2>
          <div className="zwc-faq-list">
            {FAQ_ITEMS.map((item) => {
              const isOpen = Boolean(openIds[item.id]);

              return (
                <div
                  key={item.id}
                  className={cn("zwc-faq-item", isOpen && "zwc-faq-item-open")}
                >
                  <button
                    type="button"
                    className="zwc-faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={item.panelId}
                    jf-ext-button-ct={item.buttonCt}
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="zwc-faq-question">{item.question}</span>
                    <span className="zwc-faq-icon" aria-hidden="true" />
                  </button>
                  <div
                    className={cn("zwc-faq-answer", !isOpen && "sf-hidden")}
                    id={item.panelId}
                    hidden={!isOpen}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
