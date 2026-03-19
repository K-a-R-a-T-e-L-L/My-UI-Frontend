import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { themeMantine } from "../../shared/lib/theme/mantine/theme";
import Wrapper from "../../widgets/layout/Wrapper/Wrapper";
import Header from "../../widgets/layout/Header/Header";
import Main from "../../widgets/layout/Main/Main";
import Footer from "../../widgets/layout/Footer/Footer";
import { Locale } from "../../shared/lib/i18n/routing";
import AppClientProviders from "./AppClientProviders";
import { CurrentUser } from "@/shared/lib/auth/current-user.types";

const RootProvider = ({
  children,
  locale,
  currentUser,
}: {
  children: ReactNode;
  locale: Locale;
  currentUser: CurrentUser;
}) => {
  return (
    <MantineProvider theme={themeMantine} defaultColorScheme="auto">
      <AppClientProviders currentUser={currentUser}>
        <Wrapper>
          <Header locale={locale} />
          <Main>{children}</Main>
          <Footer />
        </Wrapper>
      </AppClientProviders>
    </MantineProvider>
  );
};

export default RootProvider;
