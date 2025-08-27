"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmployeeOnboarding } from "@/features/employee-onboarding";
import { useState } from "react";

export default function page() {
  const [teacherName, setTeacherName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    console.log({ teacherName, gradeLevel });
    window.location.href = "/thank-you";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold">Employee Onboarding</h1>
        <p>
          Welcome to the employee onboarding process. Please fill in the
          following information to get started.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">New Employee</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Employee</DialogTitle>
            </DialogHeader>
            {/*  */}

            <EmployeeOnboarding />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
