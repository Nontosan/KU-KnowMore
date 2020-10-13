import { Blog } from '../interfaces/blog';

async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs`);
    const blogs = await res.json();
    return blogs;  
}

async function createBlog(newBlog: Blog): Promise<Blog|null> {
    const res = await fetch(`http://188.166.178.33:3000/blogs`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBlog),
    });
    const savedNewBlog: Blog = await res.json();
    if (savedNewBlog !== undefined) {
        return savedNewBlog;
    } else{
        return null;
    }
}

async function fetchBlogSpecific(blogid:string): Promise<Blog[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/${blogid}`);
    const blogInfo = await res.json();
    return blogInfo;  
}

export default {
    fetchBlogs,createBlog,fetchBlogSpecific,
};