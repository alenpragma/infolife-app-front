"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, User, GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FormPage() {
  const [teacherName, setTeacherName] = useState("")
  const [gradeLevel, setGradeLevel] = useState("")

  const handleSubmit = () => {
    // Handle form submission
    console.log({ teacherName, gradeLevel })
    window.location.href = "/thank-you"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-10 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-green-200 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-10 animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm shadow-lg p-4 flex items-center justify-between relative z-10">
        <Link href="/quiz">
          <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
        </Link>
        <div className="flex items-center space-x-3">
          <Image src="/edulife-logo.png" alt="EDULIFE Logo" width={40} height={40} className="object-contain" />
          <div>
            <div className="text-blue-600 font-bold text-lg">EDULIFE</div>
            <div className="text-xs text-gray-600 font-medium">IT INSTITUTE</div>
          </div>
        </div>
        <div></div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm p-6 border-b shadow-sm relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">অংগতি</h1>
          <span className="text-xl font-bold text-green-600 bg-green-100 px-4 py-2 rounded-full">৩-১৭</span>
        </div>
        <div className="mt-3 bg-gray-200 rounded-full h-3 shadow-inner">
          <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full w-4/5 shadow-sm"></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>তথ্য সংগ্রহ</span>
          <span>৮০% সম্পূর্ণ</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 relative z-10 pb-28 sm:pb-32">
        {/* Teacher Name */}
        <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border-0 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <label className="text-lg sm:text-xl font-bold text-gray-800">১. শিক্ষাগীর নাম</label>
          </div>
          <Input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="শিক্ষাগীর নাম লিখুন"
            className="w-full p-3 sm:p-4 text-base sm:text-lg bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-200 focus:shadow-lg"
          />
        </div>

        {/* Grade Level */}
        <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border-0 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <label className="text-lg sm:text-xl font-bold text-gray-800">কোন গ্রেড পড়ে?</label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Button
              variant={gradeLevel === "primary" ? "default" : "outline"}
              className={`py-6 sm:py-8 text-lg sm:text-xl font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                gradeLevel === "primary"
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                  : "bg-white/90 text-blue-700 border-2 border-blue-200 hover:bg-blue-50"
              }`}
              onClick={() => setGradeLevel("primary")}
            >
              প্রাথমিক
            </Button>
            <Button
              variant={gradeLevel === "secondary" ? "default" : "outline"}
              className={`py-6 sm:py-8 text-lg sm:text-xl font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                gradeLevel === "secondary"
                  ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg"
                  : "bg-white/90 text-purple-700 border-2 border-purple-200 hover:bg-purple-50"
              }`}
              onClick={() => setGradeLevel("secondary")}
            >
              মাধ্যমিক
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 sm:p-6 border-t shadow-2xl z-20">
        <div className="flex justify-between">
          <Link href="/quiz">
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-white/90 border-2 border-gray-300 hover:bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>পিছনে</span>
            </Button>
          </Link>

          <Button
            onClick={handleSubmit}
            disabled={!teacherName || !gradeLevel}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center space-x-2 px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
          >
            <span>সম্পূর্ণ করুন</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
