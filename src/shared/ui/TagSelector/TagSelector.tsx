"use client";
import { ActionIcon, TagsInput } from "@mantine/core";
import { IconFilter2Search, IconFilterSearch } from "@tabler/icons-react";
import { ReactNode, useMemo, useState } from "react";

interface TagSelectorProps {
  w: string;
  size: string;
  rightSection: ReactNode;
  placeholder: string;
  id?: string
}

const TagSelector: React.FC<TagSelectorProps> = (props) => {
  const { w, size, rightSection, placeholder, id } = props;
  const [tags, setTags] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "15",
    "17",
    "16",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tags;
    return tags.filter((t) => t.toLocaleLowerCase().includes(q));
  }, [tags, search]);

  return (
    <TagsInput
      w={w}
      size={size}
      id={id}
      placeholder={placeholder}
      data={suggestions}
      value={selectedTags}
      onChange={setSelectedTags}
      searchValue={search}
      onSearchChange={setSearch}
      clearable
      splitChars={[","]}
      rightSection={rightSection}
      //   maxTags={}
    />
  );
};

export default TagSelector;
