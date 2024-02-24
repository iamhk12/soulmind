import Post from '@/models/post';
import connectDB from '@/db';

connectDB();

export async function OPTIONS() {
  return Response.json({},{
    status : 200
  })
}
export async function GET(req : Request) {
  
    try {
      const posts = await Post.find({});
      return Response.json(posts, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
    
    } catch (error) {
      console.error(error);
      return Response.json({ error: 'Internal Server Error' }, {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }
   
    
  }