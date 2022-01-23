import React, { useState, useRef } from 'react';
import {Row, Col, InputGroup, Button,Form } from 'react-bootstrap' 
import '../App.css'
import {useAuth} from '../auth/context'
function Formcomponent() {
        const name = useRef()
        const phoneNumber = useRef()
        const occupation = useRef()
        const [formValues, setFormValues] = useState([{ stage:"",Q1: "", Q2: "",Q3:"" }])  
        const {currentUser , updateUserDetails} =useAuth()
        const addFormFields = () => {
            setFormValues([...formValues, { stage:"",Q1: "", Q2: "",Q3:"" }])
        }
        const removeFormFields = (i) => {
            const newFormValues = [...formValues];
            newFormValues.splice(i, 1);
            setFormValues(newFormValues)
        }
        const handleChange = (i,e) => {
            let newFormValues = [...formValues];
            newFormValues[i][e.target.name] = e.target.value;
            console.log(newFormValues);      
            setFormValues(newFormValues);
        }
        async function handleSubmit(e){
            e.preventDefault()
            console.log(currentUser.phoneNumber)
            console.log(formValues)
            const data = {
                email : currentUser.email,
                phoneNumber : currentUser.phoneNumber,
                name: currentUser.name,
                formData : formValues
            }
            await updateUserDetails(currentUser.uid, data)
        }
        return (
            <div className="auth-inner-form">
                <h1 style={{textAlign:"center"}}> <span style={{color:"orange"}}>Personal</span> <span style={{color:"blue"}}>Info</span></h1>
                <br/>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-2">
                            <Col sm={12} md={6}>
                            <Form.Group controlId="validationCustom01">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            placeholder="Name"  
                            ref={name}       
	                        />
                            </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                            <Form.Group controlId="validationCustom02">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                            required
                            type="number"
                            placeholder="phone number"
                            ref={phoneNumber}
                            />
                            </Form.Group>
                            </Col>
	                    </Row>
                        <Row className="mb-1">
                            <Form.Group md="12" controlId="validationCustomUsername">
                            <Form.Label>Name of the current career/occupation you are holding</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="occupation/career"
                                aria-describedby="inputGroupPrepend"
                                required
                                ref={occupation}
                            />
                            </Form.Group>
                        </Row>
                        <br/>
                        <Row className="md-2">
                            <Form.Group as={Col} xs="6" md="6" controlId="validationCustom04">
                            <Form.Label> Stages- </Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} xs="6" md="6" controlId="validationCustom04">
                            <Button className="button btn-dark" type="button" style={{float:"right"}} onClick={() => addFormFields()}><span style={{color:"white"}}>Add Stage</span></Button>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Row className="mb-1">
                          <Form.Group as={Col} md="12" controlId="validationCustom03">
                            <Form.Label>By observing the past since 1st class, please give the list of important stages you have crossed to reach the current career/occupation: </Form.Label>
                          </Form.Group>
	                    </Row>
	    {formValues.map((element, index) => (
            <div>
                <Row className="md-2" >
                    <Form.Group  as={Col} xs="6" md="6" controlId="validationCustom04">
                    <Form.Label  >Stage - {index+1}</Form.Label>
                    </Form.Group>
                    {
                        index ? 
                            <Form.Group as={Col} xs="6" md="6"   controlId="validationCustom04">
                            <Button className="btn btn-dark"  type="button" style={{float:"right"}} onClick={() => removeFormFields(index)}> <span style={{color:"white"}}>Remove Stage</span> </Button>
                            </Form.Group>        
                        : null
                    }
                </Row>
                <br/>
                <Row className="mb-2"  >
                    <Form.Group as={Col}  md="12" controlId="validationCustom04">
                        <Form.Control type="text" name="stage" placeholder="stage name"  required />
                        <br/>
                    </Form.Group>
                   <Form.Group as={Col} md="12"  controlId="validationCustom04">
                        <Form.Label >At each stage, what are the skills you have acquired or interesting insights/experience you have obtained, which have helped to reach current career/occupation?</Form.Label>
                        <Form.Control rows={3} as="textarea" name="Q1" value={element.Q1 || ""} onChange={e => handleChange(index, e)}  required />
                        <br/>
                    </Form.Group>
                    <Form.Group as={Col} md="12"  controlId="validationCustom04">
                        <Form.Label  >At each stage, what are the options you had to select the next stage and what was the motivation to select the stage you have opted?</Form.Label>
                        <Form.Control rows={3} as="textarea" name="Q2" value={element.Q2 || ""}  onChange={e => handleChange(index, e)}  required />
                        <br/>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom04" >
                        <Form.Label  >At each stage, give the details of career/occupation related advice you have received in reaching the current career/occupation, which has benefited you in reaching the current career. </Form.Label>
                        <Form.Control rows={3} as="textarea" name="Q3" value={element.Q3 || ""} onChange={e => handleChange(index, e)} required />
                        <br/>
                    </Form.Group>
                </Row>
            </div>
          ))}
                    <div  style={{textAlign:"center"}}>
                        <Button className="btn btn-success" type="submit" style={{width:"50%"}}>Submit</Button>
                    </div>
                </Form>
            </div>
        );
}

export default Formcomponent;