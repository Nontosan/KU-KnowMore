// IMPORT LIBRARY //
import React, { useState,useEffect } from 'react'
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Comment_component from "./comment";
import LikeViewReport from "../gadget/LikeViewReport";
import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {useHistory} from "react-router"

// IMPORT SERVICE //
import BlogsService from "../services/BlogsService";
import SectionService from "../services/SectionService";
import LoginService from '../services/LoginService';
import CourseService from '../services/CourseService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog }from '../interfaces/blog';
import {Section_Edit} from "../interfaces/SectionEdit"
import {Course_real} from "../interfaces/course"
import { Section } from '../interfaces';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
// END OF IMPORT CSS //

// IMPORT PHOTO //
import Like from '../photo/like.png';
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';
import minus from '../photo/minus_PNG39.png';
import GearEdit from '../photo/gear-edit6.png';
// END OF IMPORT PHOTO //

//------------------------------------------------------------------//

const ReadBlogKnowledge = (props:any) => {
  const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
  const [blogsInformation,setBlogsInformation] = useState<Blog[]>([]);
  const [author, setAuthor] = useState<string>('');
  const history = useHistory()
  //%%%%%%%%%%%%%%%%%%%%%%saatrt copy%%%%%%%%%%
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blogsInfomation,setBlogsInfomation] = useState<Blog[]>([])
  const blogId =window.location.pathname.split("/")[2]
  ///////////////////////////////copy/////////////////////////////////////
  const resultLimit = 10
    let i = 0;
    let k = 0;
    let check = 0;
    const [allCourse,setAllCourse] = useState<any[]>([]);
    const code:any[]=[]
    const [selectCode,setSelectCode] =useState<string>('');
    const [selectNameTh, setSelectNameTh] = useState<string>('');
    const [selectNameEn, setSelectNameEn] = useState<string>('');
    const [selectTeacher, setSelectTeacher] = useState<string>('');
    const [selectCourseId, setSelectCourseId] = useState<string>('');
  ///////////////////////////////end copy//////////////////////////////////
  //fetch blog from database
  
  const fetchCourse =(x:string)=>{
    CourseService.fetchCourse().then(res=>{
        setAllCourse(res);
        res.forEach((value,index)=>{
            //console.log(x)
            if(value.id===x){
              console.log("found")
              setSelectCode(value.Code)
              setSelectNameTh(value.NameTh)
              setSelectNameEn(value.NameEn)
              setSelectTeacher(value.Teacher)
            }
        })
    })
}
  

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  //console.log(props.match.params)
  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(blogId)
      .then(blogInfo => {
        setBlogsInformation(blogInfo);
        setAuthor(blogInfo[0].user_id);
        fetchCourse(blogInfo[0].course_id)
        //console.log(blogInfo);
      });
  }

  const fetchsection = () => {
    SectionService.fetchSections(blogId)
      .then(Arraysections => {
        setSectionsInformation(Arraysections);
      });
  }

  //refreh
  useEffect(()=>{
    fetchBlogs();
    fetchsection();
  },[])

  return (
    <div>
      {blogsInformation.map(blogInformation=>(
          <div className="Blog_Info">
              <div className="Blog_frame1">
                  <div className="Blog_name">ชื่อบล็อค </div>
                  <div className="Blog_name2">{blogInformation.blog_name}</div>
                  <div className="Blog_name">รหัสวิชา </div>
                  <div className="Blog_name2">{selectCode}</div>
                  <div className="Blog_name">ชื่อวิชา </div>
                  <div className="Blog_name2">{selectNameEn}  ({selectNameTh})</div>
                  <div className="Blog_name">ชื่อวิชา </div>
                  <div className="Blog_name2">{selectTeacher}</div>
                </div>
            </div>
      ))}
      <div className="hot-kl">
        <Card.Header>SECTION</Card.Header>
        {sectionsInformation.map(item=>(
          <div>
            <Link className="show-blog" to={`/readSection/${item.id}`}>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>{item.section_name}</strong> {item.blog_id} {item.id}</ListGroup.Item>
              </ListGroup>
            </Link>
            <Button variant="outline-danger">DELETE</Button>
            <Button variant="outline-warning">EDIT</Button>
          </div>
        ))}
      </div>
      <LikeViewReport x={blogsInformation}/>
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
        <Comment_component 
          blogId = {blogId}
        />
      </div>
      <button onClick={e=>{history.goBack()}}>back</button>
    </div>
  );
};

export default ReadBlogKnowledge
