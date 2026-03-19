"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./RevealOnView.module.css";

type RevealOnViewProps = {
  children: ReactNode;
  once?: boolean;
};

const RevealOnView = ({ children, once = true }: RevealOnViewProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setIsVisible(true);
      setIsReady(true);
      return;
    }

    const reveal = () => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    };

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 0;
    const initiallyInView = rect.top < viewportHeight * 0.92 && rect.bottom > 0;

    setIsVisible(false);
    setIsReady(true);

    if (initiallyInView) {
      reveal();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const stateClass = isReady ? (isVisible ? styles.visible : styles.hidden) : styles.visible;

  return (
    <div ref={ref} className={`${styles.root} ${stateClass}`}>
      {children}
    </div>
  );
};

export default RevealOnView;
