"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { getFallbackProviderColor } from "@/shared/utils/providerFallbackColor";
import { resolveTopologyNodeLabel } from "./topologyLabel";

type TopologyProvider = {
  id: string;
  provider: string;
  name?: string;
  status?: "active" | "error" | "idle";
};

type ProviderConfig = { color?: string; name?: string; textIcon?: string };

function getProviderConfig(providerId: string): ProviderConfig {
  return (
    (AI_PROVIDERS as Record<string, ProviderConfig>)[providerId] || {
      color: getFallbackProviderColor(providerId),
      name: providerId,
    }
  );
}

export default function ProviderTopology({
  providers,
  activeRequests = [],
  lastProvider,
  errorProvider,
}: {
  providers: TopologyProvider[];
  activeRequests?: Array<{ provider: string }>;
  lastProvider: string;
  errorProvider: string;
}) {
  const t = useTranslations("home");
  const router = useRouter();

  const activeSet = useMemo(
    () => new Set(activeRequests.map((r) => r.provider.toLowerCase())),
    [activeRequests]
  );
  const lastKey = (lastProvider || "").toLowerCase();
  const errorKey = (errorProvider || "").toLowerCase();

  const handleCardClick = useCallback(
    (providerId: string) => {
      if (providerId) {
        router.push(`/dashboard/providers/${providerId}`);
      }
    },
    [router]
  );

  const containerClass =
    "min-h-[220px] max-h-[420px] w-full min-w-0 rounded-xl border border-border bg-[#130e1b] overflow-y-auto p-4";

  if (!providers || providers.length === 0) {
    return (
      <div
        className={`${containerClass} flex flex-col items-center justify-center gap-2 text-text-muted`}
      >
        <span className="material-symbols-outlined text-[32px]">device_hub</span>
        <p className="text-sm">{t("providerTopologyEmpty")}</p>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
        {providers.map((p) => {
          const providerId = p.provider || p.id;
          const key = providerId.toLowerCase();
          const isError = errorKey === key || p.status === "error";
          const isActive = activeSet.has(key);
          const isLast = !isActive && lastKey === key;
          const isHealthy = !isError && (p.status === "active" || (!isActive && !isLast));

          const cfg = getProviderConfig(providerId);
          const label = resolveTopologyNodeLabel(p, cfg);

          let statusText = "IDLE";
          let statusBg = "bg-[#251d33] text-[#94a3b8]";
          let borderClass = "border-[#271e36]";

          if (isError) {
            statusText = "ERR";
            statusBg = "bg-[#ef4444] text-white";
            borderClass = "border-[#ef4444]/60";
          } else if (isActive) {
            statusText = "ROUTING";
            statusBg = "bg-[#059669] text-white";
            borderClass = "border-[#059669]";
          } else if (isLast) {
            statusText = "RECENT";
            statusBg = "bg-[#f59e0b] text-white";
            borderClass = "border-[#f59e0b]/50";
          } else if (isHealthy) {
            statusText = "READY";
            statusBg = "bg-[#059669]/20 text-[#34d399]";
          }

          return (
            <button
              key={p.id || providerId}
              type="button"
              onClick={() => handleCardClick(providerId)}
              className={`flex flex-col justify-between p-3 rounded-lg border ${borderClass} bg-[#181324] hover:bg-[#201830] transition-colors text-left cursor-pointer group`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 w-full">
                <div className="size-6 shrink-0 flex items-center justify-center">
                  <ProviderIcon provider={providerId} />
                </div>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider ${statusBg}`}
                >
                  {statusText}
                </span>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f1f5f9] truncate group-hover:text-white">
                  {label}
                </div>
                <div className="text-[10px] text-[#94a3b8] truncate mt-0.5 font-mono">
                  {providerId}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
