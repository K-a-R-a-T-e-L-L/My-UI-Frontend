"use client";

import { IconChevronLeft, IconChevronRight, IconUserCode } from "@tabler/icons-react";
import QuoteIcon from "@/shared/ui/icons/QuoteIcon";
import { ActionIcon, Box, Card, Group, Stack, Text, Title } from "@mantine/core";
import styles from "./CommunitySlider.module.css";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import LikesBadge from "../../../../shared/ui/LikesBadge/LikesBadge";
import type { HomeTopTemplate } from "@/widgets/pages/HomePage/model/home.server";

interface CommunitySliderProps {
  templates: HomeTopTemplate[];
}

const CommunitySlider: React.FC<CommunitySliderProps> = ({ templates }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const items = useMemo(() => {
    if (templates.length > 0) {
      return templates;
    }

    return [
      {
        id: "fallback",
        name: "Пример шаблона",
        description: "Здесь появятся самые залайканные шаблоны сообщества.",
        likesCount: 0,
        author: {
          username: null,
          firstname: null,
          lastname: null,
        },
      },
    ];
  }, [templates]);

  return (
    <Swiper
      className={styles.slider}
      onSwiper={setSwiper}
      modules={[EffectCards, Pagination]}
      effect="cards"
      speed={600}
      slidesPerView={1}
      pagination={{ clickable: true }}
      cardsEffect={{
        perSlideOffset: 1,
        perSlideRotate: 4,
        rotate: true,
        slideShadows: false,
      }}
    >
      {items.map((template, index) => {
        const authorName =
          template.author.username
            ? `@${template.author.username}`
            : `${template.author.firstname ?? ""} ${template.author.lastname ?? ""}`.trim() ||
              "Автор";

        return (
          <SwiperSlide key={`${template.id}-${index}`} className={styles.slide}>
            <Card radius="xl" p="xl" h="400px" className={styles.card}>
              <Stack h="100%" justify="space-evenly" pos="relative">
                <Group justify="space-between" w="100%">
                  <LikesBadge fz={16} iconSize={30} quantity={template.likesCount} />
                  <Box className={styles.quote}>
                    <QuoteIcon
                      color="var(--mantine-color-brandSecondaryB-4)"
                      size={150}
                    />
                  </Box>
                </Group>
                <Stack gap={1} style={{ zIndex: 1 }}>
                  <Title fz={{ base: 24, md: 32 }} order={3} className={styles.template_title}>
                    {template.name}
                  </Title>
                  <Text fz={{ base: 16, md: 18 }} className={styles.description}>
                    {template.description}
                  </Text>
                </Stack>
                <Group>
                  <Group pos="relative" w="100%">
                    <ActionIcon
                      variant="light"
                      size="xl"
                      radius="100vw"
                      bg="color-mix(in srgb, var(--mantine-color-brandSecondaryB-4) 20%, transparent 80%)"
                    >
                      <IconUserCode />
                    </ActionIcon>
                    <Stack gap={0}>
                      <Title order={4} fz={{ base: 18, md: 20 }}>
                        {authorName}
                      </Title>
                      <Text opacity={0.6} fz={{ base: 14, md: 16 }}>
                        Community author
                      </Text>
                    </Stack>
                  </Group>
                </Group>
              </Stack>
            </Card>
          </SwiperSlide>
        );
      })}
      <Group style={{ position: "absolute", bottom: 60, right: 32, zIndex: 999 }}>
        <ActionIcon
          size="xl"
          onClick={() => swiper?.slidePrev()}
          color=" var(--mantine-color-brandSecondaryB-4)"
          variant="light"
          radius="100vw"
        >
          <IconChevronLeft />
        </ActionIcon>
        <ActionIcon
          color=" var(--mantine-color-brandSecondaryB-4)"
          size="xl"
          onClick={() => swiper?.slideNext()}
          variant="light"
          radius="100vw"
        >
          <IconChevronRight />
        </ActionIcon>
      </Group>
    </Swiper>
  );
};

export default CommunitySlider;
