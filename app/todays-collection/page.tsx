"use client"

import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, TrendingUp, Users, CheckCircle, Clock, BarChart3 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for today's collection statistics
const todaysStats = {
  totalCollected: 12,
  completedForms: 8,
  pendingForms: 4,
  totalTeachers: 25,
  collectionRate: 48, // percentage
  todaysTarget: 20,
}

const recentCollections = [
  {
    id: 1,
    teacherName: "মোহাম্মদ রহিম",
    time: "১০:৩০ AM",
    status: "সম্পূর্ণ",
  },
  {
    id: 2,
    teacherName: "ফাতেমা খাতুন",
    time: "১১:১৫ AM",
    status: "সম্পূর্ণ",
  },
  {
    id: 3,
    teacherName: "আব্দুল করিম",
    time: "১২:০০ PM",
    status: "পর্যালোচনায়",
  },
]

export default function TodaysCollectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-10 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-10 animate-bounce delay-1000"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg p-4 flex items-center relative z-10">
        <Link href="/dashboard">
          <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
        </Link>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center space-x-3">
            <Image src="/edulife-logo.png" alt="EDULIFE Logo" width={40} height={40} className="object-contain" />
            <div>
              <div className="text-blue-600 font-bold text-lg">EDULIFE</div>
              <div className="text-xs text-gray-600 font-medium">IT INSTITUTE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="p-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">আজকের সংগ্রহ</h1>
          <p className="text-gray-600">আজকের ফর্ম সংগ্রহের পরিসংখ্যান</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="p-4 space-y-4 relative z-10">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl rounded-2xl border-0">
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{todaysStats.totalCollected}</div>
              <div className="text-sm opacity-90">আজকের সংগ্রহ</div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl rounded-2xl border-0">
            <div className="text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{todaysStats.completedForms}</div>
              <div className="text-sm opacity-90">সম্পূর্ণ ফর্ম</div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl rounded-2xl border-0">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{todaysStats.pendingForms}</div>
              <div className="text-sm opacity-90">অপেক্ষমাণ</div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl rounded-2xl border-0">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{todaysStats.totalTeachers}</div>
              <div className="text-sm opacity-90">মোট শিক্ষক</div>
            </div>
          </Card>
        </div>

        {/* Progress Card */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800">আজকের লক্ষ্য</h3>
            <BarChart3 className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">অগ্রগতি</span>
              <span className="font-semibold text-gray-800">
                {todaysStats.totalCollected}/{todaysStats.todaysTarget}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(todaysStats.totalCollected / todaysStats.todaysTarget) * 100}%` }}
              ></div>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-blue-600">{todaysStats.collectionRate}%</span>
              <span className="text-sm text-gray-600 ml-2">সম্পন্ন</span>
            </div>
          </div>
        </Card>

        {/* Recent Collections */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border-0">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            সাম্প্রতিক সংগ্রহ
          </h3>
          <div className="space-y-3">
            {recentCollections.map((collection) => (
              <div key={collection.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{collection.teacherName.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{collection.teacherName}</div>
                    <div className="text-sm text-gray-600">{collection.time}</div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    collection.status === "সম্পূর্ণ" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {collection.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl z-20">
        <div className="grid grid-cols-3">
          <Link href="/dashboard" className="p-4 text-center hover:bg-blue-500 transition-colors duration-200">
            <ArrowLeft className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm font-medium">ফিরে যান</span>
          </Link>
          <Link href="/all-forms" className="p-4 text-center hover:bg-blue-500 transition-colors duration-200">
            <BarChart3 className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm font-medium">সব ফর্ম</span>
          </Link>
          <div className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-1 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{todaysStats.collectionRate}%</span>
            </div>
            <span className="text-sm font-medium">সম্পন্ন</span>
          </div>
        </div>
      </div>

      <div className="pb-24"></div>
    </div>
  )
}
