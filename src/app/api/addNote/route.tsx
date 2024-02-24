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
        const {email, data} = await req.json()
        const newNote = new Note({
            email,data
        });

        await newNote.save();
        return Response.json({ message: 'Note added successfully', newNote },{
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