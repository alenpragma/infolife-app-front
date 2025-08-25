"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [userId, setUserId] = useState("edulife@")
  const [password, setPassword] = useState("1234")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-10 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm space-y-6 sm:space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-6 relative">
            <Image
              src="/edulife-logo.png"
              alt="EDULIFE IT Institute Logo"
              width={128}
              height={128}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-wide">এডুলাইফ সার্ভিসে স্বাগতম</h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 sm:mb-8 drop-shadow-sm">লগ ইন</h2>
          </div>
        </div>

        <Card className="p-6 sm:p-8 bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-2xl transform hover:scale-105 transition-all duration-300">
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">ইউজার আইডি</label>
              <Input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-base sm:text-sm text-gray-700 transition-all duration-200 focus:shadow-lg"
                placeholder="edulife@"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">পাসওয়ার্ড</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-base sm:text-sm text-gray-700 transition-all duration-200 focus:shadow-lg"
                placeholder="1234"
              />
            </div>

            <Link href="/dashboard">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mt-2">
                লগ ইন
              </Button>
            </Link>

            <p className="text-center text-sm text-gray-600 mt-4 sm:mt-6 font-medium">সমস্যা? কল করুন।</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
