import React,{useState,useEffect}from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogsService from '../../services/BlogsService';
import { Blog } from '../../interfaces/blog';
import ViewBlog_Modal from '../modal/ViewBlog_Modal';
import DelReport_Modal from '../modal/DelReport_Modal';
import ViewComment_Modal from '../modal/ViewComment_Modal';
import '../../style/section.css';
const FetchBlogname = (props:any) => {
    
    const [hasError,setErrors] = useState<boolean>(false)
    const [user,setUser] = useState<any[]>([])
    const [report,setReport] = useState<any[]>([])

    async function fetchData(){
        const res =  await fetch(`https://backend.ku-knowmore.xyz/users/${props.rblog.user_id}`)
        res
            .json()
            .then(res => setUser(res))
            .catch(err => setErrors(err))
    }

    async function fetchReport(){
        const res =  await fetch(`https://backend.ku-knowmore.xyz/reports/${props.rblog.id}`)
        res
            .json()
            .then(res => setReport(res))
            .catch(err => setErrors(err))
    }

    useEffect(() =>{ 
        fetchData();
        fetchReport();
    },[])
    const username = user.map(u=>u.name)
    const datetime = report.map(u=>u.date_time)
    return (
        <div>
            <div>
                <div className="d-flex" >
                    <div className ="mr-auto p-2">
                    {(props.rblog.content_type!='comment')
                        ? <ViewBlog_Modal rblog = {props.rblog}/>
                        : <ViewComment_Modal rblog = {props.rblog}/>
                    }
                    </div>
                    
                    <div className="p-2 size-text-report">
                        Reported by: {username}&nbsp;
                        Date_time: {datetime}&nbsp;
                    </div>
                    

                    <div className="p-2 cancel-button">
                        <DelReport_Modal rblog = {props.rblog}/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FetchBlogname;