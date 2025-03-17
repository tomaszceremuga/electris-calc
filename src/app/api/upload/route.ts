// import { put } from "@vercel/blob"
// import { NextResponse } from "next/server"

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     const { searchParams } = new URL(request.url)
//     const filename = searchParams.get("filename")

//     if (!filename) {
//       return NextResponse.json({ error: "Filename is required" }, { status: 400 })
//     }

//     // Convert the request body to a Blob to ensure it's compatible with the put function
//     const buffer = await request.arrayBuffer()
//     const blob = new Blob([buffer])

//     // Upload file to Vercel Blob using the environment variable
//     const result = await put(filename, blob, {
//       access: "public",
//       // The token is automatically used from the environment variable
//       // You don't need to explicitly pass it here
//     })

//     return NextResponse.json(result)
//   } catch (error) {
//     console.error("Error uploading to Blob:", error)
//     const errorMessage = error instanceof Error ? error.message : "Unknown error"
//     return NextResponse.json({ error: `Failed to upload file: ${errorMessage}` }, { status: 500 })
//   }
// }

import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 })
    }

    // Konwertujemy body requestu na Blob
    const buffer = await request.arrayBuffer()
    const blob = new Blob([buffer])

    // Przesyłamy plik do Vercel Blob
    const result = await put(filename, blob, {
      access: "public",
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error uploading to Blob:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: `Failed to upload file: ${errorMessage}` }, { status: 500 })
  }
}

