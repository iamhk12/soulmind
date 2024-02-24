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

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const postToUpdate = await Post.findById(id);

    if (!postToUpdate) {
      return Response.json({ error: "Post not found" },{
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    postToUpdate.supports += 1;

    await postToUpdate.save();

    return Response.json({ message: 'Support added successfully'},{
        status : 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
  } catch (error) {
    console.error(error);
    return Response.json({error : "Internal Server Error"},{
        status : 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
  }
}
