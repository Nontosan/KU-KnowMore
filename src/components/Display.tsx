import React from 'react';
import {useImage } from 'react-image';

function ImageComponent (props:any) {
    
    const {src} = useImage({
      srcList: `http://188.166.178.33:3000/${props.userid}`, //this is my edit
    })
   
    return <img src={src} />
  }
   
  export default ImageComponent;