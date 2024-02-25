import Post from "@/models/post";
import SupportedPosts from "@/models/supportedPosts";
import connectDB from "@/db";
import supportedPosts from "@/models/supportedPosts";

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
    const email = searchParams.get("email");

    const postToUpdate = await Post.findById(id);
    let postsArrayObject: any = await SupportedPosts.find({ email });

    if (!postsArrayObject || postsArrayObject.length === 0) {
      const newSupportedPosts = new SupportedPosts({
        email,
        supported: [],
      });

      await newSupportedPosts.save();
      postsArrayObject = await SupportedPosts.find({ email });
    }

    if (!postToUpdate) {
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

    if (postToUpdate.supports > 0) {
      postToUpdate.supports -= 1;
    }

    const existingSupportedPosts = postsArrayObject[0];
    existingSupportedPosts.supported = existingSupportedPosts.supported.filter(
      (postId: any) => postId != id
    );

    await postToUpdate.save();
    await existingSupportedPosts.save();

    return Response.json(
      { message: "Support removed successfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
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
