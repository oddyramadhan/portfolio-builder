"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { PortfolioItem, UserPortfolio } from "@/utils/types";

export default function PortfolioPreview({
  backgroundImage,
  profileImage,
  profile,
  portfolios = [],
}: UserPortfolio) {
  const getImageSrc = (value: File | string | undefined): string => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return URL.createObjectURL(value);
  };
  return (
    <div className="w-full mx-auto rounded-md overflow-hidden shadow-lg bg-white">
      {/* Background image */}
      <div className="relative w-full h-36 md:h-48">
        <Image
          src={getImageSrc(backgroundImage) || "/background.jpg"}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Profile image */}
      <div className="relative flex justify-center -mt-16">
        <div className="w-32 h-32 rounded-full overflow-hidden border-[5px] border-white shadow-md">
          <Image
            src={getImageSrc(profileImage) || "/avatar.png"}
            alt="Profile"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Name, Title, Description */}
      <div className="text-center px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {profile.name || "Nama"}
        </h2>
        <p className="text-base text-gray-500">
          {profile?.position || "Title"}
        </p>
        <p className="text-sm text-gray-600 w-2/3 md:w-1/3 mx-auto">
          {profile.description}
        </p>
      </div>

      {/* Portfolios Section */}
      <div className="flex flex-col mb-8 gap-2 w-full mx-auto px-10 lg:px-12">
        {portfolios.length > 0 && (
          <p className="text-lg font-semibold text-gray-700  text-left">
            Portofolio
          </p>
        )}
        {portfolios?.map(
          (item: PortfolioItem, idx: number) =>
            item.name &&
            item.company && (
              <Card
                className="p-4 w-full mt-2 gap-0"
                key={`${item.name}-${idx}`}
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.position}
                </h3>
                <p className="text-sm text-gray-500 font-semibold">
                  {item.company}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(item.startDate), "dd MMMM yyyy", {
                    locale: id,
                  })}{" "}
                  -{" "}
                  {item.endDate
                    ? format(new Date(item.endDate), "dd MMMM yyyy", {
                        locale: id,
                      })
                    : "Sekarang"}
                </p>
                <p className="text-sm mt-1 whitespace-pre-line text-justify">
                  {item.description}
                </p>
              </Card>
            )
        )}
      </div>
    </div>
  );
}
