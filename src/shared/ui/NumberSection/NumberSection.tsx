import { Text } from "@mantine/core";
import styles from "./NumberSection.module.css";

interface NumberSectionProps {
  tilt: "right" | "left";
  number: string;
}

const NumberSection: React.FC<NumberSectionProps> = (props) => {
  const { tilt, number } = props;

  return (
    <Text
      className={styles.number}
      style={{
        "--rotate-number": tilt === "left" ? "-20" : "20",
        right: tilt === "left" ? "auto" : 0,
        left: tilt === "right" ? "auto" : 0,
      }}
    >
      {number}
    </Text>
  );
};

export default NumberSection;
