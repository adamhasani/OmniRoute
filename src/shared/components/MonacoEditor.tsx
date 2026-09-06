"use client";

import React, { useCallback } from "react";

export type EditorProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  language?: string;
  theme?: string;
  height?: string | number;
  className?: string;
  options?: {
    readOnly?: boolean;
    minimap?: { enabled?: boolean };
    wordWrap?: "on" | "off";
    lineNumbers?: "on" | "off";
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export default function MonacoEditor({
  value,
  defaultValue = "",
  onChange,
  height = "300px",
  className = "",
  options = {},
}: EditorProps) {
  const isReadOnly = Boolean(options?.readOnly);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`relative w-full rounded-lg border border-[#2a203c] bg-[#0f0b17] overflow-hidden ${className}`}
      style={{ height: heightStyle }}
    >
      <textarea
        value={value !== undefined ? value : defaultValue}
        readOnly={isReadOnly}
        onChange={handleChange}
        spellCheck={false}
        className="w-full h-full p-3 font-mono text-xs text-[#e2e8f0] bg-transparent outline-none resize-none leading-relaxed selection:bg-[#059669]/30"
        placeholder="// Code / JSON content..."
      />
    </div>
  );
}
