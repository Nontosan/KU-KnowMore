import { Like } from '../interfaces/Like';
import { isConditionalExpression } from 'typescript';
import { yupToFormErrors } from 'formik';

async function fetchLike(blogId:string): Promise<Like[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogId}/likes`);
    const likes = await res.json();
    return likes;  
}

async function createLike(blogId:string,data:any): Promise<boolean> {
  console.log(blogId,data)
  console.log(JSON.stringify(data))
  const islike = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogId}/likes`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"user_id":"5f82fd5504eb8600aa617b6b"}),
    });
    const like = await islike.json();
    console.log(like)
    if(like.Status==="Like"){
      return true
    }
    else if(like.Status==="Unlike"){
      return false
    }
    else{
      console.log("cant like")
    }
  return true
}
  /*
  if(islike==="like"){
    return true
  }
  else if(islike==="unlike"){
    return false
  }
  else{
    console.log("cant like")
  }
  */





export default {
  fetchLike,createLike
};