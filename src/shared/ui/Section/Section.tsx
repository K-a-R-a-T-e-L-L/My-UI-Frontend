import { CSSProperties, ReactNode } from "react";
import RevealOnView from "@/shared/ui/RevealOnView/RevealOnView";

interface SectionProps {
  children: ReactNode;
  ariaLabelledby: string;
  styles?: CSSProperties;
  id?: string;
  disableReveal?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, ariaLabelledby, styles, id, disableReveal }) => {
  return (
    <section
      aria-labelledby={ariaLabelledby}
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "clamp(540px, 74vh, 820px)",
        position: "relative",
        ...styles,
      }}
      id={id}
    >
      {disableReveal ? children : <RevealOnView>{children}</RevealOnView>}
    </section>
  );
};

export default Section
