import Note from '@/models/note';
import connectDB from '@/db';

connectDB();

export async function OPTIONS() {
  return Response.json({},{
    status : 200
  })
}

export async function POST(req : Request){
    try {
        const {_id} = await req.json()

        const deletedNote = await Note.findByIdAndDelete(_id);

        if (!deletedNote) {
            return Response.json({error : "Note Not Found"},{
                status : 404,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
              })
        }
        return Response.json({ message: 'Note deleted successfully' },{
            status : 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        })
        
    } catch (err) {
        console.error(err);
        return Response.json({error : "Internal Server Error"},{
          status : 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        })
    }

}