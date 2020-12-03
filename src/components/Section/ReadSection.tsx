// IMPORT LIBRARY //
import React, { useState , useEffect , Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { draftToHtml } from 'react-wysiwyg-typescript';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DisplayFile from '../DisplayFile';
import DisplayFileandDel from '../DisandDel';
import LoadFileModal from "../../modals/loadfile"
import Deletesection from "../../modals/DeleteSection"

// IMPORT SERVICE //
import SectionService from '../../services/SectionService';

// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Section } from '../../interfaces';
import { Attachments } from '../../interfaces/blog';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import '../section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../file.css';
import Card from 'react-bootstrap/Card';

import { convertToRaw, EditorState } from 'draft-js';
import { type } from 'os';
import { convertToObject } from 'typescript';
import { useLocation,useHistory } from 'react-router';
import { Link } from 'react-router-dom';


import minus from '../../photo/minus_PNG39.png';
import GearEdit from '../../photo/gear-edit6.png';
import BlogsService from '../../services/BlogsService';

import 'antd/dist/antd.css';

import { notification,message } from 'antd';
//------------------------------------------------------------------//

const ReadSection = (props:any) => {
    const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
    const [afterFetch, setafterFetch] = useState<boolean>(false);
    const [displayHTML, setDisplayHTML] = useState<any>();
    const sectionId = (props.match.params.sectionId);
    const [stateCheck, setstateCheck] = useState<boolean>(false);
    const [attachmentsInformation, setattachmentsInformation] = useState<Attachments[]>([]);
    //const blogId = window.location.pathname.split("/")[2]
    //const location=useLocation();
    const history=useHistory()
    const [sectionName, setSectionName] = useState<string>("");
    const [author, setAuthor] = useState<string>('');
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [statusDelete, setStatusDelete] = useState<boolean>(false);
    const fetchSection = () => {
        SectionService.fetchSectionsSpecific(sectionId)
            .then(sectioninfo => {
                BlogsService.fetchBlogSpecific(sectioninfo[0].blog_id)
                    .then(bloginfo => {
                        setAuthor(bloginfo[0].user_id);
                    })
                setSectionsInformation(sectioninfo);
                setstateCheck(true);
            })
    }
    const initdraft = () => {
        const draftstate = sectionsInformation[0].content;
        const markup = draftToHtml(
            draftstate, 
        );
        //console.log(markup);
        setDisplayHTML(markup);
        setSectionName(sectionsInformation[0].section_name);
    }
    const deletesection=()=>{
        console.log("delete seciton")
        SectionService.deleteSection(sectionId)
        //window.location.replace(`https://backend.ku-knowmore.xyz/knowledge/${sectionsInformation[0].blog_id}`)
    }
    ////////antd//////////
    const key = 'updatable';
    const handleDeleteBlog = () => {
        console.log('handle delete blog')
        setShowDeleteModal(true);
    }
        
    const openMessage = () => {
        console.log("hello")
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            message.success({ content: 'Already delete section', key, duration: 2 });
        }, 100);
        
    };

    const close = () => {
        console.log(
          'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
      };
    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
        <a href={`https://backend.ku-knowmore.xyz/knowledge/${sectionsInformation[0].blog_id}`}>
          <Button type="primary"  onClick={() => {
            notification.close(key)
            openMessage()
            deletesection()
          }}>
            Confirm
          </Button>
        </a>
        );
        notification.open({
          message: 'Notification',
          description:
            'Would you like to delete this section from your blog?',
          btn,
          key,
          onClose: close,
        });
      };
    const closeModal = () => {
        setShowDeleteModal(false);
    }
    //////////////////
    useEffect(() => {
        fetchSection();
    },[])
    useEffect(() => {
        if (stateCheck !== false){
            initdraft();
            setafterFetch(!afterFetch);
        }
    },[stateCheck])
    //useEffect( () => {
    //    initdraft();
    //    setafterFetch(!afterFetch);
    //},[sectionsInformation])
    useEffect(() => {
        if (statusDelete==true) {
          window.location.replace(`/knowledge/${sectionsInformation[0]?.blog_id}`);
          setStatusDelete(false);
        }
      },[statusDelete]);
    const submitDeleteSection = () => {
        console.log("fuck")
        setShowDeleteModal(false);
        SectionService.deleteSection(sectionId)
            .then(res => {
                if (res) {
                    setStatusDelete(true);
                }
            })
    }
    return (
        <div>
            {false &&
            <div className="hot-kl">
                <Card.Header>
                    <strong>
                        Section 
                    </strong> : {sectionName}
                    <div style={{ float: "right" }}>
                        {author==localStorage.userId &&
                        <div>
                            <Button className="blog-delete-button" onClick={e=>window.location.replace(`https://backend.ku-knowmore.xyz/editSection/${sectionId}`)}>
                              <Image className="gear-setting-pic blog-fl" src={GearEdit}></Image>
                            </Button>
                            <Button className="blog-delete-button" onClick={e=>openNotification()}>
                                <Image className="delete-setting-pic blog-fl" src={minus}></Image>
                            </Button>
                        </div>
                        }
                    </div>
                </Card.Header>
            </div>}
            {afterFetch &&
                <div className="hot-kl-noborder-top">
                    {false &&<Card.Header>Information</Card.Header>}
                    <Card.Header>
                        <strong>
                            Section 
                        </strong> : {sectionName}
                        <div style={{ float: "right" }}>
                            {author==localStorage.userId &&
                            <div>
                                <Button className="blog-delete-button" onClick={e=>window.location.replace(`https://backend.ku-knowmore.xyz/editSection/${sectionId}`)}>
                                    <Image className="gear-setting-pic blog-fl" src={GearEdit}></Image>
                                </Button>
                                <Button className="blog-delete-button" onClick={() => handleDeleteBlog()}>
                                    <Image className="delete-setting-pic blog-fl" src={minus}></Image>
                                </Button>
                                {showDeleteModal && 
                                    <div>
                                        <Deletesection
                                        show = {showDeleteModal}
                                        nameSection = {sectionsInformation[0]?.section_name}
                                        deleteBlog = {submitDeleteSection}
                                        cancel = {closeModal}
                                        />
                                    </div>
                                }
                            </div>
                            }
                        </div>
                    </Card.Header>
                    <div className="div-section-content" dangerouslySetInnerHTML={{__html: displayHTML}} />
                </div>
            }
            <LoadFileModal />
            <div className="read_button">
                <Button variant="secondary" onClick={e=>history.goBack()}>back</Button>
            </div>
        </div>
    );
}
export default ReadSection;
