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
import { updateUserSchema } from "@/schema/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { z } from "zod";

type FormType = z.infer<typeof updateUserSchema>;

const UpdateUserPage = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;

  // ✅ User data fetch
  const { data, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${userId}`);
      return res.data.data;
    },
    enabled: !!userId,
  });

  // ✅ Update mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormType) => {
      const res = await axiosInstance.patch(`/users/${userId}`, formData);
      return res.data;
    },
    onSuccess: (data) => {
      showSuccessAlert(data.message || "User updated successfully!");
      setTimeout(() => {
        router.push("/admin/all-users");
      }, 2000);
    },
    onError: (err: any) => {
      showErrorAlert(err.message);
    },
  });

  const handleSubmit = (formData: FormType) => {
    mutate(formData);
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading user data...</p>;
  }

  const initialValues: FormType = {
    name: data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    password: undefined,
  };

  console.log(data);

  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto shadow-md rounded-xl border border-border1 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Update User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GenericForm
            schema={updateUserSchema}
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
                placeholder="Enter new password (optional)"
              />

              <SubmitButton
                label="Update User"
                isLoading={isPending}
                loadingLabel="Updating..."
                width="full"
              />
            </div>
          </GenericForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUserPage;
