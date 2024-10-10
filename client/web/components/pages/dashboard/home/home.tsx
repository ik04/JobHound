"use client";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { GlobalContext } from "@/app/context/GlobalContext";
import { CompanyLink } from "@/app/types/Api";
import { CompanyLinkCard } from "./companyLinkCard";
import { AddLinkButton } from "./addLinkButton";

export const Home = () => {
  const { user } = useContext(GlobalContext);
  const [companyLinks, setCompanyLinks] = useState<CompanyLink[]>([]);
  const callSites = async () => {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/get/company-links`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    setCompanyLinks(resp.data.links);
  };
  useEffect(() => {
    if (user?.token) {
      callSites();
    }
  }, [user?.token]);

  const chunkArray = (array: CompanyLink[], chunkSize: number) => {
    const result: CompanyLink[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const companyLinkChunks = companyLinks ? chunkArray(companyLinks, 9) : [];

  const handleAddition = (companyLink: CompanyLink) => {
    setCompanyLinks((prev) => [...prev, companyLink]);
  };

  const handleDeletion = (id: number) => {
    setCompanyLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleUpdation = (updatedLink: CompanyLink) => {
    setCompanyLinks((prev) =>
      prev.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );
  };

  return (
    <div className="min-h-[89.8vh] bg-main flex justify-center items-center">
      {/* this is retarded */}
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        className="w-full max-w-[70%]"
      >
        {companyLinkChunks.map((chunk, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="h-[80vh] w-full grid grid-cols-3 gap-6 justify-center items-center">
              {chunk.map((link) => (
                <CompanyLinkCard
                  handleUpdate={handleUpdation}
                  key={link.id}
                  companyLink={link}
                  handleDeletion={handleDeletion}
                />
              ))}
              {index === companyLinkChunks.length - 1 && (
                <AddLinkButton handleAddition={handleAddition} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
