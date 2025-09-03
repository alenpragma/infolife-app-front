// app/admin/questions/page.tsx
import Link from "next/link";

type Question = {
  id: string;
  text: string;
  type: string;
  required: boolean;
  step: number;
};

// ✅ SSR function
async function getQuestions(): Promise<Question[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qus`, {
    // cache: "no-store",
    next: { revalidate: 10 }, // ISR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await res.json();
  return data.data;
}

export default async function Page() {
  let questions: Question[] = [];

  try {
    questions = await getQuestions();
  } catch (error) {
    return <p className="text-red-500">Failed to fetch questions</p>;
  }

  if (questions.length === 0) {
    return <p className="p-6">No questions found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Questions</h2>
      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="p-4 bg-white shadow rounded-lg border flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{q.text}</h3>
              <p className="text-sm text-gray-600">Type: {q.type}</p>
              <p className="text-sm text-gray-600">
                Required: {q.required ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-600">Step: {q.step}</p>
            </div>
            <div className="flex gap-5">
              <Link
                href={`/admin/add-sub-questions/${q.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Add sub Qus
              </Link>

              <Link
                href={`/admin/questions/${q.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Update
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
