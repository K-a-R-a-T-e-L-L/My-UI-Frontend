"use client";

import styles from "./FiltersForm.module.css";
import {
  ActionIcon,
  Button,
  Group,
  Select,
  Stack,
  Switch,
  TagsInput,
  TextInput,
} from "@mantine/core";
import {
  IconCalendar,
  IconFilter2Search,
  IconSearch,
  IconSelector,
  IconTagPlus,
} from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type FilterSort = "newest" | "oldest" | "likes";

type CategoryOption = {
  value: string;
  label: string;
};

interface FiltersFormProps {
  initialSearch?: string;
  initialCategoryId?: string;
  initialSort?: FilterSort;
  initialTags?: string[];
  initialOnlyFavorites?: boolean;
  categories: CategoryOption[];
}

const FiltersForm = ({
  initialSearch = "",
  initialCategoryId = "",
  initialSort = "newest",
  initialTags = [],
  initialOnlyFavorites = false,
  categories,
}: FiltersFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [sort, setSort] = useState<FilterSort>(initialSort);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [onlyFavorites, setOnlyFavorites] = useState(initialOnlyFavorites);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("templatesPage");

    const normalizedSearch = search.trim();
    if (normalizedSearch) params.set("search", normalizedSearch);
    else params.delete("search");

    if (categoryId) params.set("categoryId", categoryId);
    else params.delete("categoryId");

    if (sort && sort !== "newest") params.set("sort", sort);
    else params.delete("sort");

    if (tags.length > 0) params.set("tags", tags.join(","));
    else params.delete("tags");

    if (onlyFavorites) params.set("onlyFavorites", "true");
    else params.delete("onlyFavorites");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <Stack align="center" component="form" onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>
      <Group
        w="100%"
        justify="space-between"
        className={styles.top_group}
        wrap="nowrap"
      >
        <TextInput
          size="md"
          placeholder="Поиск по названию"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          w={{ base: "100%", md: "50%" }}
          rightSection={
            <ActionIcon variant="transparent" onClick={applyFilters} aria-label="Искать">
              <IconSearch size={20} className={styles.icon} />
            </ActionIcon>
          }
          className={styles.top_group__input}
        />
        <Group w="50%" className={styles.top_group__inner} wrap="nowrap">
          <Select
            size="md"
            w={{ base: "100%", md: "50%" }}
            data={categories}
            value={categoryId || null}
            onChange={(value) => setCategoryId(value ?? "")}
            placeholder="Категория"
            rightSection={<IconSelector size={20} className={styles.icon} />}
            clearable
          />
          <Select
            size="md"
            w={{ base: "100%", md: "50%" }}
            data={[
              { value: "newest", label: "Сначала новые" },
              { value: "oldest", label: "Сначала старые" },
              { value: "likes", label: "По лайкам" },
            ]}
            value={sort}
            onChange={(value) => setSort((value as FilterSort) || "newest")}
            placeholder="Сортировка"
            rightSection={<IconCalendar size={20} className={styles.icon} />}
          />
        </Group>
      </Group>
      <Group w="100%" wrap="nowrap" className={styles.bottom_group}>
        <TagsInput
          placeholder="Теги"
          w="100%"
          size="md"
          value={tags}
          onChange={setTags}
          splitChars={[","]}
          clearable
          rightSection={<IconTagPlus size={20} className={styles.icon} />}
        />
        <Switch
          label="Избранное"
          checked={onlyFavorites}
          onChange={(event) => setOnlyFavorites(event.currentTarget.checked)}
        />
      </Group>
      <Button
        size="md"
        radius="md"
        gradient={{
          from: "var(--mantine-color-brandSecondaryA-9)",
          to: "var(--mantine-color-brandPrimary-9)",
        }}
        className={styles.button}
        w={200}
        variant="gradient"
        rightSection={<IconFilter2Search size={20} />}
        type="submit"
      >
        Искать
      </Button>
    </Stack>
  );
};

export default FiltersForm;
