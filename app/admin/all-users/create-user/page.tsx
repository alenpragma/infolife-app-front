"use client";

import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { PasswordField } from "@/components/form/fields/PasswordField";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { TextField } from "@/components/form/fields/TextField";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { userSchema } from "@/schema/schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { z } from "zod";

type FormType = z.infer<typeof userSchema>;

const initialValues: FormType = {
  name: "",
  email: "",
  phone: "",
  img: "",
  password: "",
  location: "",
  position: "",
};

const CreateUserPage = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const res = await axiosInstance.post("/auth/create", data);
      return res.data;
    },
    onSuccess: (data) => {
      showSuccessAlert(data.message);
      formRef.current?.reset();
      setTimeout(() => {
        router.push("/admin/all-users");
      }, 2000);
    },
    onError: (err: any) => {
      showErrorAlert(err.message);
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
              <TextField
                name="position"
                label="Position"
                placeholder="Enter position"
              />
              <TextField
                name="location"
                label="location"
                placeholder="Enter location"
              />
              <TextField name="phone" label="Phone" placeholder="Enter phone" />
              <TextField
                name="img"
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
