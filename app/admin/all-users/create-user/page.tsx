"use client";

import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { PasswordField } from "@/components/form/fields/PasswordField";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { TextField } from "@/components/form/fields/TextField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { userSchema } from "@/schema/schema";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";

type FormType = z.infer<typeof userSchema>;

const initialValues: FormType = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

const CreateUserPage = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const res = await axiosInstance.post("/auth/create", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User created successfully!");
      formRef.current?.reset();
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create user");
    },
  });

  const handleSubmit = (data: FormType) => {
    mutate(data);
  };

  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto shadow-md rounded-xl border border-border1 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Create User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GenericForm
            schema={userSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="space-y-4">
              <TextField name="name" label="Name" placeholder="Enter name" />
              <TextField
                name="email"
                label="Email"
                placeholder="Enter email"
                type="email"
              />
              <TextField name="phone" label="Phone" placeholder="Enter phone" />
              <TextField
                name="profileImage"
                label="Profile Image URL"
                placeholder="Enter URL"
              />
              <PasswordField
                name="password"
                label="Password"
                placeholder="Enter password"
              />

              <SubmitButton
                label="Create User"
                isLoading={isPending}
                loadingLabel="Creating..."
                width="full"
              />
            </div>
          </GenericForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUserPage;
