"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  login: string;
  password: string;
}

interface FormErrors {
  login?: string;
  password?: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    if (!formData.login) newErrors.login = "Email or username is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/login`,
          formData,
          { withCredentials: true }
        );

        if (response.status === 200) {
          console.log("Login successful");
          const token = response.data.token;
          document.cookie = `token=${token}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
          // location.href = "/";
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="bg-main h-screen flex space-y-5 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="form flex flex-col space-y-4 font-base"
      >
        <h1 className="font-display uppercase text-4xl text-center text-highlight">
          JobHound
        </h1>
        <div className="flex flex-col space-y-1">
          <div className="">
            <Label htmlFor="login" className="text-white font-base">
              Email or username
            </Label>
            <Input
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              className="border border-highlight text-highlight font-base"
            />
            {errors.login && <p className="text-red-500">{errors.login}</p>}
          </div>
          <div className="">
            <Label htmlFor="password" className="text-white font-base">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-highlight text-highlight font-base"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="button bg-highlight uppercase hover:text-highlight hover:border-highlight border border-highlight"
        >
          Login
        </Button>
        <div className="text-white">
          Don't have an account?{" "}
          <Link href={"/register"} className="text-highlight">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
