"use client";

import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { TextField } from "@/components/form/fields/TextField";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { useMutation } from "@tanstack/react-query";

import { PasswordField } from "@/components/form/fields/PasswordField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { loginSchema } from "@/schema/loginSignup/loginSignup";
import { LoginResponse } from "@/type/loginSignup/loginSignup";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { z } from "zod";

type FormType = z.infer<typeof loginSchema>;

const initialValues: FormType = {
  email: "",
  password: "",
};
const page = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      const response = await axiosInstance.post<LoginResponse>(
        `/auth/login`,
        data
      );
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      Cookies.set("infolife", data.data.token);
      console.log(data?.data?.user.role, "data");

      showSuccessAlert(data.message);
      if (data?.data?.user?.role == "USER") {
        router.push("/user");
      } else {
        router.push("/admin");
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err?.message || "Login failed.");
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data);
  };

  return (
    <>
      <div className=" ">
        <div className="flex justify-center items-center w-full mb-3">
          <Link href="/">
            <Image
              src="/images/logo/logo.png"
              alt="Logo"
              className="w-28 md:w-44"
              width={500}
              height={500}
              priority
            />
          </Link>
        </div>
        <Card className="w-full shadow-xl border md:rounded-xl border-border1 border-whiteGray rounded-md  bg-white/10  text-white md:w-2/5 mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-black font-semibold mt-4 text-center">
              Login
            </CardTitle>
          </CardHeader>

          <CardContent>
            <GenericForm
              schema={loginSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="space-y-4">
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email "
                  //   inputClass="px-3 px-3"
                  className="text-black"
                />
                <div className="relative">
                  <PasswordField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    className="text-black"
                  />

                  <div className="w-full text-end">
                    <Link
                      className="text-end text-[14px] font-medium "
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <SubmitButton
                  className=" border border-border1 border-darkGray w-full cursor-pointer"
                  width="full"
                  label="Login"
                  isLoading={isPending}
                  loadingLabel="Processing.."
                />
              </div>
            </GenericForm>
            <p className="text-center mt-2 ">
              Do you {`havn't`} an account?{" "}
              <Link href="/sign-up" className="text-brand-gold">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default page;
