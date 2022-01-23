import React, {useState, useEffect} from 'react';
import { Table, Form, FormControl, Button} from 'react-bootstrap'
import {userdata} from './data.js'
import MyVerticallyCenteredModal from './formview.component.js';
function Dataform() {
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(false);
    const [searchValue, setSearchValue] = useState("")
    const [filteredResults, setFilteredResults] =useState(userdata)
    const [searchInput, setSearchInput] = useState("")
    const [type,setType] = useState("name")
    function modalClick(index){
        setModalShow(true);
        setModalData(userdata[index]['formdetails'])
    }
    useEffect(() => {
        setSearchInput(searchValue)
        if (searchValue !== '') {
            const filteredData = userdata.filter((item) => {
                return Object.values(item[type]).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
            if(!filteredData){
                setFilteredResults(userdata)
            }
        }
        else{
            setFilteredResults(userdata)
        }
    },[searchValue]);
    return (
        <>
            <div className="d-flex">
            <i class="bi bi-funnel-fill" style={{ fontSize: '2em', color:"black" }} />
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchValue}
              onChange={e=>setSearchValue(e.target.value)}
            />
            <Form.Select aria-label="Default select example"
                onChange={e=> setType(e.target.value)}
                value={type}
            >
                <option value="name">name</option>
                <option value="email">email</option>
                <option value="phonenumber">phonenumber</option>
            </Form.Select>
          </div>
          <br/>
  <Table responsive="md" striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Username</th>
        <th>email address</th>
        <th>Phone number</th>
      </tr>
    </thead>
    <tbody>
       { filteredResults.map((data,index) =>
        <tr>
            <td key={index}>{index}</td>
            <td key={data.name}>{data.name}</td>
            <td key={data.email}>{data.email}</td>
            <td key={data.phonenumber}>formData</td>
        </tr>
        )}
    </tbody>
  </Table>
    <MyVerticallyCenteredModal
        show={modalShow}
        data= {modalData}
        onHide={() => setModalShow(false)}
      />    
  </>

        );

}

export default Dataform;