import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([
        // Step 1 - Basic Info
        { name: "name", label: "Name", type: "text", required: true, placeholder: "Enter your name", step: 1 },
        { name: "name", label: "Name", type: "text", required: true, placeholder: "Enter ", step: 1 },
        {
            name: "gender", label: "Gender", type: "radio", required: true,
            options: [
                { value: "Male", text: "Male" },
                { value: "Female", text: "Female" },
                { value: "Other", text: "Other" }
            ],
            step: 1
        },
        { name: "dob", label: "Date of Birth", type: "date", required: true, step: 1 },
        { name: "bio", label: "Bio", type: "textarea", required: false, placeholder: "Enter your bio", step: 1 },

        // Step 2 - Student Details
        { name: "class", label: "Class", type: "text", required: true, placeholder: "Enter your class", step: 2 },
        { name: "rollNo", label: "Roll Number", type: "text", required: true, placeholder: "Enter roll number", step: 2 },
        {
            name: "section", label: "Section", type: "radio", required: true,
            options: [
                { value: "A", text: "A" },
                { value: "B", text: "B" },
                { value: "C", text: "C" }
            ],
            step: 2
        },
        { name: "address", label: "Address", type: "textarea", required: true, placeholder: "Enter your address", step: 2 },

        // Step 3 - Parent/Guardian & Interests & Terms
        { name: "guardianName", label: "Guardian's Name", type: "text", required: true, placeholder: "Enter guardian name", step: 3 },
        { name: "guardianPhone", label: "Guardian's Phone", type: "text", required: true, placeholder: "Enter guardian phone number", step: 3 },
        {
            name: "relation", label: "Relation with Student", type: "radio", required: true,
            options: [
                { value: "Father", text: "Father" },
                { value: "Mother", text: "Mother" },
                { value: "Brother", text: "Brother" },
                { value: "Sister", text: "Sister" },
                { value: "Other", text: "Other" }
            ],
            step: 3
        },
        {
            name: "interests", label: "Interests", type: "checkboxGroup",
            options: [
                { value: "Reading", text: "Reading" },
                { value: "Coding", text: "Coding" },
                { value: "Gaming", text: "Gaming" },
                { value: "Traveling", text: "Traveling" }
            ],
            step: 3
        },
        { name: "terms", label: "I agree to the terms", type: "checkbox", required: true, step: 3 }
    ]);
}
