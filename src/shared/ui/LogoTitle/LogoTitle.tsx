import { Box, Group, Image, Title } from "@mantine/core";
import styles from "./LogoTitle.module.css";
import { MEDIA } from "@/shared/lib/media";

const LogoTitle = ({ t }: { t: (key: string) => string }) => {
  return (
    <Group h="100%" gap={10} pos="relative">
      <Box h={40} style={{ aspectRatio: "1/1" }} pos="relative">
        <Image
          src={MEDIA.images.logo.src}
          alt="My UI logo"
          w="100%"
          h="100%"
          fit="contain"
        />
      </Box>
      <Title order={2} className={styles.brand_title}>
        <span className={styles.brand_title_text}>{t("brand")}</span>
      </Title>
    </Group>
  );
};

export default LogoTitle;
