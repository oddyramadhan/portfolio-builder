"use client";

import { useEffect, useState } from "react";
import { getLatestSettings } from "@/lib/api";
import PortfolioPreview from "@/components/portfolio-preview";
import { toast } from "sonner";
import { UserPortfolio } from "@/utils/types";
import { Loader2Icon } from "lucide-react";

const PLACEHOLDER_PROFILE = {
  name: "Name",
  position: "Position",
  description:
    "You don't have any settings yet. Please go to the editor to create your portfolio.",
};

export default function PreviewPage() {
  const [settings, setSettings] = useState<UserPortfolio | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getLatestSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to load portfolio settings:", error);
        toast.error("Unable to load your portfolio. Please check your server connection.");
      } finally {
        setIsFetching(false);
      }
    }

    fetchSettings();
  }, []);

  if (isFetching) {
    return (
      <div className="w-full max-w-5xl mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2Icon className="w-8 h-8 animate-spin text-gray-500" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="w-full max-w-5xl mx-auto p-8">
        <PortfolioPreview
          backgroundImage=""
          profileImage=""
          profile={PLACEHOLDER_PROFILE}
          portfolios={[]}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-8">
      <PortfolioPreview
        backgroundImage={settings.backgroundImage}
        profileImage={settings.profileImage}
        profile={settings.profile}
        portfolios={settings.portfolios}
      />
    </div>
  );
}