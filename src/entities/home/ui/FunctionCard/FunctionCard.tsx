import { Card, MantineRadius, MantineStyleProps, Stack } from "@mantine/core";
import styles from "./FunctionCard.module.css";
import { JSX, ReactNode } from "react";

interface FunctionCardProps {
  w: MantineStyleProps["w"];
  py: MantineStyleProps["py"];
  radius: MantineRadius;
  children: ReactNode;
}

const FunctionCard: React.FC<FunctionCardProps> = (props) => {
  const { w, py, radius, children } = props;

  return (
    <Card w={w} py={py} radius={radius} className={styles.card_func}>
      <Stack align="center">{children}</Stack>
    </Card>
  );
};

export default FunctionCard;
