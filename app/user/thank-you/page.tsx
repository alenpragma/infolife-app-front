"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Home, FileText, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-bounce delay-1000"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
        {showConfetti && (
          <>
            <div className="absolute top-10 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute top-20 right-1/3 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-80"></div>
            <div className="absolute top-32 left-1/2 w-5 h-5 bg-green-400 rounded-full animate-bounce delay-500 opacity-80"></div>
            <div className="absolute top-16 right-1/4 w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-1000 opacity-80"></div>
          </>
        )}
      </div>

      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg p-4 flex items-center justify-center relative z-10">
        <div className="flex items-center space-x-3">
          <Image src="/edulife-logo.png" alt="EDULIFE Logo" width={40} height={40} className="object-contain" />
          <div>
            <div className="text-blue-600 font-bold text-lg">EDULIFE</div>
            <div className="text-xs text-gray-600 font-medium">IT INSTITUTE</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6 relative z-10">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border-0 p-6 sm:p-8 text-center transform animate-pulse">
          {/* Success Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" style={{ animationDuration: "2s" }} />
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">ধন্যবাদ!</h1>
          <p className="text-lg sm:text-xl text-green-600 font-semibold mb-2">ফর্ম সফলভাবে জমা হয়েছে</p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            আপনার তথ্য সংগ্রহ সম্পূর্ণ হয়েছে। আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।
          </p>

          {/* Success Stats */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 mb-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">সম্পূর্ণ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">✓</div>
                <div className="text-sm text-gray-600">যাচাইকৃত</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/dashboard" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Home className="w-5 h-5 mr-2" />
                হোমে ফিরে যান
              </Button>
            </Link>

            <Link href="/all-forms" className="block">
              <Button
                variant="outline"
                className="w-full bg-white/90 border-2 border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <FileText className="w-5 h-5 mr-2" />
                সব ফর্ম দেখুন
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-700">
              <strong>রেফারেন্স নম্বর:</strong> EDU-{Date.now().toString().slice(-6)}
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
