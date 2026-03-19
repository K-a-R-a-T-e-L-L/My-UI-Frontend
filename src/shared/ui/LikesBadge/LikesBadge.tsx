import { Group, MantineStyleProps, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import styles from './LikesBadge.module.css'

interface LikesBadgeProps {
  quantity: number;
  fz: MantineStyleProps["fz"];
  iconSize: number | string;
}

const LikesBadge: React.FC<LikesBadgeProps> = ({ quantity, fz, iconSize }) => {
  return (
    <Group gap={5}>
      <IconHeart
        size={iconSize}
        className={styles.icon}
      />
      <Text fz={fz} className={styles.text} fw={600}>
        {quantity}
      </Text>
    </Group>
  );
};

export default LikesBadge;
