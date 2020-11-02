import React, { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import LikeServive from "../services/LikeService"
import BlogService from "../services/BlogsService"
import beforeLike from '../photo/like.png';
import afterLike from "../photo/like.jpg"
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';
import {Like} from "../interfaces/Like"
import {Blog} from "../interfaces/blog"
import ReportModal from "../modals/report"
import {LikeOutlined,LikeTwoTone,EyeOutlined} from '@ant-design/icons';
import "./gadgetclass.css"


const LikeViewReport=(props:any)=> {
    const [like,setLike] = useState<boolean>(false)
    const [liker ,setliker] = useState<Like[]>([]) 
    const [bloginfo,setbloginfo] = useState<Blog[]>([])
    const blogId = window.location.pathname.split("/")[2]
    const fetchBlog=()=>{
        BlogService.fetchBlogSpecific(blogId).then(res=>{
            setbloginfo(res)
        })
    }
    const fetchLiker=()=>{
        LikeServive.fetchLike(blogId).then(res=>{
            setliker(res)
        })
    }
    const clicklike=async()=>{
        const data:any={
            //sending userid of token
            user_id:"5f82fd5504eb8600aa617b6b",
        }
        LikeServive.createLike(blogId,data).then(res=>{
            setLike(res)
        })
    }
  
    useEffect(() => {
        fetchBlog()
        fetchLiker()
        clicklike()
    },[]);

    return (
        <div>
            <div >
                {like 
                    ?   (<button className="likebutton" onClick={clicklike}>
                            <LikeOutlined />{liker.length}
                        </button>) 
                    :   (<button className="likebutton" onClick={clicklike}>
                            <LikeTwoTone />{liker.length}
                        </button>) 
                }
                <EyeOutlined />{bloginfo.map(x=>(<div style={{ display: "inline" }}>{x.viewers}</div>))}
            </div>
        </div>
    );
}
export default LikeViewReport;