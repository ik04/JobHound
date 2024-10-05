"use client";
import React, { useContext, useEffect } from "react";
import { Navbar } from "./navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { GlobalContext } from "@/app/context/GlobalContext";

export const Home = () => {
  const { user } = useContext(GlobalContext);
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
    console.log(resp);
  };
  useEffect(() => {
    if (user?.token) {
      callSites();
    }
  }, [user?.token]);
  return (
    <div className="min-h-[89.8vh] bg-main flex justify-center items-center">
      {/* this is retarded */}
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        className="w-full max-w-[70%]"
      >
        <SwiperSlide className="flex justify-center items-center">
          <div className="h-[80vh] w-full bg-red-300"></div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <div className="h-[80vh] w-full bg-green-300"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
