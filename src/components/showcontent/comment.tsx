// IMPORT LIBRARY //
import React,{useState,useEffect,useCallback} from "react";
import { useParams } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DeleteCommentModal from '../modal/DelComment_inblog';
import UserCommentAuthor from "./UserCommentAuthor";
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import loadcomment from "../../services/loadcomment";
import CommentService from "../../services/CommentService";

// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import {Comment_Sch} from "../../interfaces/comment";
import { User_Sch } from "../../interfaces/user";
// END OF IMPORT INTERFACE//

import ReportButton from '../../Photo/more (1).png';
import 'antd/dist/antd.css';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import "./comment.css" 
//------------------------------------------------------------------//

import {Formik,Form,Field,ErrorMessage} from "formik";


type comment_loaded={
    comments:Comment_Sch
}
type user_loaded={
    users:User_Sch
}
type comment_blog={
    comment_id:string;
    blog_id:string;
    user_id:string;
    content:string;
    date_time:Date;
    profile_description?:string;
    pic_name?:string;
    username?:string;
    pic_dir?:string;
}

const Comment_component=(props:any)=>{
    const [comments,setcomment] = useState<any[]>([])
    const [user,setuser] = useState<User_Sch>()
    const [deleteVisible,setdelete] = useState<boolean>(false)
    /*const [cmt_blogs,setcmt_blog] = useState<comment_blog[]>([]);*/
    const cmt_blogs:comment_blog[] = []
    //const blog_id
    const blogId:string = window.location.pathname.split("/")[2]

    
    //CONST FOR DELETE MODAL//
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [statusDelete, setStatusDelete] = useState<boolean>(false);
    const [deleteCommentId, setDeleteCommentId] = useState<string>('');
    //END OF CONST FOR DELETE MODAL//

    //load comment form database

    const fetchCommentblog=()=>{
        CommentService.fetchComment(props.blogId)
            .then(comments => {
                console.log(comments);
                setcomment(comments)
            });
    }
    

    const handleDeleteComment=(commentId:string)=>{
        console.log(commentId);
        setShowDeleteModal(true);
        setDeleteCommentId(commentId);
    }

    const handlereport=()=>{
        if(localStorage.accessToken==undefined){
            alert('PLEASE LOGIN FIRST')
        }
        console.log("handlereport comment")
        //popup form
        //https://www.youtube.com/watch?v=l2Kp2SzUdlg&ab_channel=Weibenfalk[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
    }

    const submitDeleteComment = () => {
        setShowDeleteModal(false);
        console.log(deleteCommentId);
        CommentService.deleteComment(deleteCommentId)
            .then(res => {
                if (res) {
                    setStatusDelete(true);
                }
                console.log(res);
            })
    }

    const closeModal = () => {
        setShowDeleteModal(false);
    }

    
    useEffect(()=>{
        fetchCommentblog()
        //console.log("HELLOEIEIZACOMMENT");
        //check is token id is userid then set deleteVisible ??[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
    },[])

    useEffect(() => {
        if (statusDelete==true) {
          fetchCommentblog();
          setStatusDelete(false);
        }
      },[statusDelete]);
    //DOM

    return (
        <div>
            {comments.map(item=>(
                <div className="show-all-comment">
                    <div className="blog-fl black-font">
                        <UserCommentAuthor 
                            userid = {item.user_id}
                        />
                    </div>
                    <div className="blog-fl black-font">
                        {item.content}
                    </div>
                    <div className="blog-fl black-font">
                        {item.date_time}
                        
                    </div>
                    <div className="blog-fr">
                        
                    </div>
                </div>
            ))}     
        </div>
    )
}

export default Comment_component