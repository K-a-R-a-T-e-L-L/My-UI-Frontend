import { Box, Group } from "@mantine/core";
import styles from "./LoadingDots.module.css";

interface LoadingDotsProps {
  fz?: number;
}

const LoadingDots: React.FC<LoadingDotsProps> = (props) => {
  const { fz } = props;

  return (
    <Group gap={4}>
      <Box
        component="span"
        className={styles.dot}
        style={{ fontSize: `${fz}px` }}
      >
        •
      </Box>
      <Box
        component="span"
        className={styles.dot}
        style={{ fontSize: `${fz}px` }}
      >
        •
      </Box>
      <Box
        component="span"
        className={styles.dot}
        style={{ fontSize: `${fz}px` }}
      >
        •
      </Box>
    </Group>
  );
};

export default LoadingDots;
