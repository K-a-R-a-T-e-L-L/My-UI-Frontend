import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      w="100%"
      bg="transparent"
      header={{ height: 80 }}
    >
      {children}
    </AppShell>
  );
};

export default Wrapper;
