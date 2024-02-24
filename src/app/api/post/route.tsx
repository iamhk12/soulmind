import Post from "@/models/post";
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

export async function GET(req: Request) {
  
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");
    
    const foundPost = await Post.findById(postId);

    if (!foundPost) {
      return Response.json(
        { error: "Post not found" },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    return Response.json(foundPost, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
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
