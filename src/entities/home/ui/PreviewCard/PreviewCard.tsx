import {
  Box,
  Card,
  Image,
  MantineRadius,
  MantineStyleProps,
  Stack,
} from "@mantine/core";
import styles from "./PreviewCard.module.css";
import { ReactNode } from "react";

interface PreviewCardProps {
  w: MantineStyleProps["w"];
  radius: MantineRadius;
  img: string;
  children: ReactNode;
}

const PreviewCard: React.FC<PreviewCardProps> = (props) => {
  const { w, radius, img, children } = props;

  return (
    <Card w={w} className={styles.card_preview} radius={radius} p={0}>
      <Stack>
        <Box className={styles.preview_component}>
          <Image src={img} fit="cover" w="100%" h="100%" />
        </Box>
        <Stack p="lg">{children}</Stack>
      </Stack>
    </Card>
  );
};

export default PreviewCard;
