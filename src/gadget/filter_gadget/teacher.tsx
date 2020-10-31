import React, { useState , Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function Teacher(props:any){
    
    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                <InputGroup.Text>teacher</InputGroup.Text>
                </InputGroup.Prepend>
                <input value={props.teacher} onChange={(e)=>props.setteacher(e.target.value)}/>
            </InputGroup>
        </div>
    );
}
export default Teacher