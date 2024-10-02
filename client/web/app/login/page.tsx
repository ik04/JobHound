import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const page = () => {
  return (
    <div className="bg-main h-screen flex justify-center items-center">
      <div className="form">
        <h1 className="font-display text-2xl text-center text-highlight">
          JobHound
        </h1>
        <div className="">
          <Label></Label>
          <Input />
        </div>
      </div>
    </div>
  );
};

export default page;
