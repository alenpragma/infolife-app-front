"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExitModal({ isOpen, onClose }: ExitModalProps) {
  if (!isOpen) return null;

  const handleExit = () => {
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <Card className="w-full max-w-sm bg-white/95 backdrop-blur-sm shadow-md rounded-2xl border-0 transform animate-in zoom-in-95 duration-300">
        <div className="p-8">
          {/* Modal Icon */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LogOut className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              অ্যাপ থেকে বের হন
            </h3>
            <p className="text-lg text-center text-gray-700 leading-relaxed">
              আপনি কি অ্যাপ থেকে বের হতে চাচ্ছেন?
            </p>
          </div>

          {/* Enhanced buttons with better styling and hover effects */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleExit}
              className="py-4 text-lg font-semibold bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              হ্যাঁ
            </Button>
            <Button
              onClick={onClose}
              className="py-4 text-lg font-semibold bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              না
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
