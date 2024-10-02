"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios

interface FormData {
  email: string;
  name: string;
  username: string;
  github_url: string;
  linkedin_url: string;
  password: string;
}

interface FormErrors {
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  username?: string;
  name?: string;
  password?: string;
}

const Page: React.FC = () => {
  const router = useRouter(); // useRouter to redirect after registration
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    github_url: "",
    linkedin_url: "",
    password: "",
    name: "",
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
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.linkedin_url)
      newErrors.linkedin_url = "LinkedIn URL is required";
    if (!formData.github_url) newErrors.github_url = "GitHub URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/register`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Registration successful");
          router.push("/login"); // Use router to redirect
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <div className="bg-main h-screen flex space-y-5 justify-center items-center">
      <form
        onSubmit={register}
        className="form flex flex-col space-y-4 font-base"
      >
        <h1 className="font-display uppercase text-4xl text-center text-highlight">
          JobHound
        </h1>
        <div className="flex flex-col space-y-3">
          <div>
            <Label htmlFor="name" className="text-white font-base">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-highlight text-highlight font-base"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email" className="text-white font-base">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-highlight text-highlight font-base"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="username" className="text-white font-base">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border border-highlight text-highlight font-base"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </div>
          <div>
            <Label htmlFor="github_url" className="text-white font-base">
              GitHub URL
            </Label>
            <Input
              id="github_url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              className="border border-highlight text-highlight font-base"
            />
            {errors.github_url && (
              <p className="text-red-500">{errors.github_url}</p>
            )}
          </div>
          <div>
            <Label htmlFor="linkedin_url" className="text-white font-base">
              LinkedIn URL
            </Label>
            <Input
              id="linkedin_url"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleChange}
              className="border border-highlight text-highlight font-base"
            />
            {errors.linkedin_url && (
              <p className="text-red-500">{errors.linkedin_url}</p>
            )}
          </div>
          <div>
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
          Register
        </Button>
        <div className="text-white text-center">
          Have an account?{" "}
          <Link href="/login" className="text-highlight">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
