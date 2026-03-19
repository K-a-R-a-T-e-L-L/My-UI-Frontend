"use client";

import { Button } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { copyTemplateCode } from "@/shared/api/generated/clients";

interface CopyTemplateCodeButtonProps {
  templateId: string;
  code: string;
}

const CopyTemplateCodeButton = ({ templateId, code }: CopyTemplateCodeButtonProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (!code.trim()) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
    void copyTemplateCode(templateId).catch(() => undefined);
  };

  return (
    <Button
      onClick={() => void onCopy()}
      leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
      variant={copied ? "filled" : "light"}
      color={copied ? "green" : "blue"}
      radius="md"
    >
      {copied ? "Скопировано" : "Скопировать код"}
    </Button>
  );
};

export default CopyTemplateCodeButton;

