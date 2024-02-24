import Contact from "@/models/contact";
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
    const { name, email, phone, subject, message } = await req.json();

    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();
    return Response.json(
      { message: "Contacted successfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (err) {
    console.error(err);
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
