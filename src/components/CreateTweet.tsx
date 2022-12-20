import {useState} from 'react'
import { trpc } from '../utils/trpc'
import {object, string} from "zod"
export const tweetSchema = object({
  text: string({
    required_error: "Text is required"
  }).min(10).max(20)
})


const CreateTweet = () => {

  const [text, setText] = useState("")
  const [error, setError] = useState("");

  const utils  = trpc.useContext();

  const {mutateAsync} = trpc.tweet.create.useMutation({
    onSuccess: () =>{
      setText("");
      utils.tweet.timeline.invalidate();

    }
  })
  

  async function handleSubmit(e :any){
    e.preventDefault();
    try{
      await tweetSchema.parse({text})
    }
    catch(e){
      setError(e.message);
      return;
    }

    mutateAsync({text})
  }
  return( 
  <>
  <form onSubmit={handleSubmit} className="flex w-full flex-col p-4 border-2 rounded-md">
    <textarea  onChange ={(e) => setText(e.target.value)} />
    <div>
      <button type='submit'>tweet</button>
    </div>
  </form>
  {error && JSON.stringify(error)}

  </>
  )
}

export default CreateTweet