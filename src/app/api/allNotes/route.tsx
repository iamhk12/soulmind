import Note from "@/models/note";
import connectDB from "@/db";

connectDB();

export async function OPTIONS() {
  return Response.json(
    {},
    {
      status: 200,
    }
  );
}
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const notes = await Note.find({ email });
    return Response.json(notes, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
