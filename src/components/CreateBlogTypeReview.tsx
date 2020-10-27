import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router"


import '../components/createblog_component/input.css';
import Button from 'react-bootstrap/Button';
import CourseService from "../services/CourseService"
import {
  Link, Redirect,
} from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from "formik"
import { Course, Course_real } from '../interfaces/course';
import '../App.css';
import BlogsService from '../services/BlogsService';
import {Blog,create_Blog} from "../interfaces/blog"
//------------------------------------------------------------------//
const options = [
    { value: '0123', label: 'Blues' },
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'orchestra' ,label: 'Orchestra' } 
  ];

const CreateKlBlog=()=> {
    const resultLimit = 10
    let i = 0;
    let k = 0;
    let check = 0;
    const blogtype = window.location.pathname.split("/")[1]
    console.log(blogtype)
    const [allCourse,setAllCourse] = useState<any[]>([]);
    const codeoption:any[]=[]
    const Teacheroption:any[]=[]
    const [codeOptions,setCodeOptions] = useState<any[]>([]);
    const [teacherOptions,setTeacherOptions] = useState<any[]>([]);
    const [course,setCourse] = useState<Course_real[]>([])
    const code:any[]=[]
    const [selectCode,setSelectCode] =useState<string>('');
    const [selectNameTh, setSelectNameTh] = useState<string>('');
    const [selectNameEn, setSelectNameEn] = useState<string>('');
    const [selectTeacher, setSelectTeacher] = useState<string>('');
    const [selectCourseId, setSelectCourseId] = useState<string>('');
    const [NameTh,setNameTh] =useState({})
    const [NameEn,setNameEn] =useState({})
    const [Teacher,setTeacher] =useState({})
    const [visible,setVisible] = useState<boolean>(false)
    const [available,setAvailable] = useState<boolean>(false)



    const [UrlLink, setUrl]=useState<string>("");
    const [afterSave, setafterSave] = useState<boolean>(false);
    const history = useHistory()
//    const resetvalue=()=>{
//        const codeoption=[{}]
//        const NameThoption=[{}]
//        const NameEnoption=[{}]
//        const Teacheroption=[{}]
//            
//    }
    const handleChangeCode = (selectedOption:any) => {
        code.push({ selectedOption })
        //console.log((code[0].selectedOption).value);
        setSelectCode((code[0].selectedOption).value);
    }

    const handleChangeTeacher = (selectedOption:any) => {
        setSelectCourseId(selectedOption.value);
        setSelectTeacher(selectedOption.label);
    }
    
    const fetchCourse =async()=>{
        const x = await CourseService.fetchCourse().then(res=>{
            setCourse(res)
            setAllCourse(res);
            res.forEach((value,index)=>{
                codeoption.push({ value: value.Code, label: value.Code })
            })
        })
        setCodeOptions(codeoption);
        setAvailable(true);
    }

    useEffect(()=>{
        fetchCourse()
    },[])

    useEffect(()=>{
        if (available!==undefined){
            setVisible(true);
        }
    },[available])

    useEffect(()=>{
        if(selectCode!==undefined){
            //console.log(selectCode);
            //console.log("HELLO");
            {allCourse.map(item => {
                if(item.Code==selectCode){
                    if(check == 0){
                        setSelectNameTh(item.NameTh)
                        setSelectNameEn(item.NameEn)
                        check = 1;
                    }
                    Teacheroption.push({ value: item.id, label: item.Teacher })
                }
            })}
            console.log(Teacheroption);
            setTeacherOptions(Teacheroption);
        }
    },[selectCode])

    useEffect(()=>{
        if(selectCourseId!==undefined){
            console.log(selectCourseId);
            console.log(selectTeacher);
        }
    },[selectCourseId])
    useEffect(() => {
        if (UrlLink !== ""){
          console.log(UrlLink);
          setafterSave(!afterSave);
        }
      },[UrlLink]);
    return (
        <div className="hot-kl">
            <div>Create Review</div>
            <Formik
            initialValues={{nameblog:""}}
            onSubmit={(values,actions)=>{
                //console.log("hello")
                if(values.nameblog!=="" && selectCode!=="" && selectTeacher!==""){
                    const newBlog={
                        user_id: "5f82fd2e04eb8600aa617b66",
                        type: "review",
                        blog_name: values.nameblog,
                        course_id: selectCourseId
                    }
                    BlogsService.createBlog(newBlog).then(res=>{
                        if(res!==null){
                            setUrl(res.id)
                        }
                        console.log(res)
                    })
                }
                else{
                    alert("Please complete the form")
                }
                actions.setSubmitting(false)
            }}
        >
            {({isSubmitting})=>(
                <Form>
                    <div>BlogName</div><Field type="input" name="nameblog"/>
                    {visible &&
                        <div>
                            {codeoption[0]}
                            <div>code</div>
                                <Select 
                                    options = {codeOptions} 
                                    onChange={handleChangeCode}
                                    isSearchable
                                    filterOption={({label}, query) => label.indexOf(query.toLowerCase()) >= 0 && i++ < resultLimit}
                                    onInputChange={() => { i = 0 }}
                                />
                            <div>NameTh</div>
                                <Select 
                                    isDisabled
                                    placeholder={selectNameTh}
                                />
                            <div>NameEn</div>
                                <Select 
                                    isDisabled
                                    placeholder={selectNameEn}
                                />

                            <div>Teacher</div>
                                <Select 
                                    options = {teacherOptions} 
                                    onChange={handleChangeTeacher}
                                    isSearchable
                                />
                        </div>
                    }
                    <div className="Cancel">
                        <Button variant="danger" onClick={e=>history.goBack()}> Cancel </Button>
                    </div>
                    <div className="Submit">
                        <button disabled={isSubmitting}> Submit </button>
                        {afterSave &&
                            <div>
                                <Redirect to={`myReview/${UrlLink}`} />
                            </div>
                        }
                    </div>
                </Form>
            )}
        </Formik>
        </div>  
    );
}
      

export default CreateKlBlog;