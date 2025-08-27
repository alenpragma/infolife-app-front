"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const questions = [
  {
    id: 1,
    question: "আপনার কী নার্সারী থেকে দশম শ্রেণিতে পড়ে এমন ছেলে-মেয়ে আছে?",
    progress: "৩-১৭",
  },
  {
    id: 2,
    question: "তারা কী প্রাইভেট শিক্ষকের কাছে পড়ে?",
    progress: "৩-১৭",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Navigate to form page
      window.location.href = "/form"
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse"></div>
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-10 animate-bounce delay-1000"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-10 animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm shadow-lg p-4 flex items-center justify-between relative z-10">
        <Link href="/dashboard">
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
          <span className="text-xl font-bold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            {questions[currentQuestion].progress}
          </span>
        </div>
        <div className="mt-3 bg-gray-200 rounded-full h-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>প্রশ্ন {currentQuestion + 1}</span>
          <span>{questions.length} এর মধ্যে</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 relative z-10">
        <Card className="p-4 sm:p-6 md:p-8 bg-white/95 backdrop-blur-sm shadow-2xl mb-6 sm:mb-8 rounded-2xl border-0 transform hover:scale-105 transition-all duration-300">
          <div className="text-center mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-lg sm:text-2xl">{currentQuestion + 1}</span>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-800 leading-relaxed text-center font-medium px-2">
            {questions[currentQuestion].question}
          </p>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Button
            variant={answers[currentQuestion] === "yes" ? "default" : "outline"}
            className={`py-6 sm:py-8 text-lg sm:text-xl font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
              answers[currentQuestion] === "yes"
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-white/90 text-blue-700 border-2 border-blue-200 hover:bg-blue-50"
            }`}
            onClick={() => handleAnswer("yes")}
          >
            হ্যাঁ
          </Button>
          <Button
            variant={answers[currentQuestion] === "no" ? "default" : "outline"}
            className={`py-6 sm:py-8 text-lg sm:text-xl font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
              answers[currentQuestion] === "no"
                ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg"
                : "bg-white/90 text-red-700 border-2 border-red-200 hover:bg-red-50"
            }`}
            onClick={() => handleAnswer("no")}
          >
            না
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 sm:p-6 border-t shadow-2xl z-20">
        <div className="flex justify-between">
          {currentQuestion > 0 ? (
            <Button
              variant="outline"
              onClick={prevQuestion}
              className="flex items-center space-x-2 bg-white/90 border-2 border-gray-300 hover:bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>পিছনে</span>
            </Button>
          ) : (
            <div></div>
          )}

          <Button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion]}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center space-x-2 px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
          >
            <span>পরবর্তী</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
