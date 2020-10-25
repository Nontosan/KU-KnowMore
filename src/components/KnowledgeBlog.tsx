// IMPORT LIBRARY //
import React, { useEffect , useState , Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {
    Link, Redirect, NavLink
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DeleteModal from '../modals/DeleteModal';
import UserAuthor from './UserAuthor';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from '../services/BlogsService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog } from '../interfaces/blog';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const KnowledgeBlog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [BlogDelete, setBlogDelete] = useState<Blog>();
    const [statusDelete, setStatusDelete] = useState<boolean>(false);

    const fetchBlogs = async() => {
        const x =await BlogsService.fetchKnowledgeBlogs()
            .then(blogs => {
                console.log(blogs);
                setBlogs(blogs);
                console.log(blogs);
            });
    };

    const handleDelete = (blog:Blog) => {
        setShowDeleteModal(true);
        setBlogDelete(blog);
    }

    const closeModal = () => {
        setShowDeleteModal(false);
    }
    
    const submitDeleteBlog = () => {
        setShowDeleteModal(false);
        BlogsService.deleteBlog(BlogDelete?.id!)
            .then(res => {
                if (res) {
                    setStatusDelete(true);
                }
            })
    }

    const UserInfo = () => {
        console.log("HELLO");
    }

    useEffect(() => {
        fetchBlogs();
    },[]);

    useEffect(() => {
        if (statusDelete==true) {
            fetchBlogs();
            setStatusDelete(false);
        }
    },[statusDelete]);

    return (
        <div>
            <div className="hot-kl">
                <Card.Header>KNOWLEDGE BLOG</Card.Header>
                {blogs.map(blog => (
                    <div>
                        <Link to={`/read${blog.type}/${blog.id}`}>
                            <div className="blog-fl">
                                &nbsp;&nbsp;&nbsp;&nbsp;Blog Name : {blog.blog_name} &nbsp;&nbsp;&nbsp;&nbsp; Viewer :{blog.viewers} &nbsp;&nbsp;&nbsp;&nbsp; Last Edit :{blog.last_edit}  
                            </div> 
                            <UserAuthor
                                userid = {blog.user_id}
                            />
                        </Link>
                        <br />
                    </div>
                ))}
            </div>
            {showDeleteModal && 
                <div>
                    <DeleteModal 
                        show = {showDeleteModal}
                        nameBlog = {BlogDelete?.blog_name}
                        deleteBlog = {submitDeleteBlog}
                        cancel = {closeModal}
                    />
                </div>
            }
        </div>
    );
}

export default KnowledgeBlog;
