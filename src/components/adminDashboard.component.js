import React, {useState} from 'react';
import '../css/admin.css'
import NavLogin from '../navs/navlogin';
import Datausers from './datausers.component';
import Dataform from './dataform.component';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../css/admin.css'
function AdminDashboard() {
    const [data , setData] =useState(true);
    const changeDataElement = (selected) => {
        if (selected === "users"){
            setData(true);
        }
        else{
            setData(false);
        }
    }
    return (
            <>
        <NavLogin/>
        <div class="media">
            <div class="image">
            <div>
            <SideNav
                    onSelect={(selected)=>{
                        changeDataElement(selected);
                    }}
                    id="sdb"
            >
    <SideNav.Toggle disabled={false} style={{ fontSize: '1.75em', color:"black" }} />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="users" active={data}>
            <NavIcon>
                <i class="bi bi-house-fill" style={{ fontSize: '1.75em', color:"black" }} />
            </NavIcon>
            <NavText style={{color:"black"}}>
                Users Data
            </NavText>
        </NavItem>
        <NavItem eventKey="form">
            <NavIcon>
                <i class="bi bi-bar-chart-fill" style={{ fontSize: '1.75em', color:"black" }} />
            </NavIcon>
            <NavText style={{color:"black"}}>
                Form Data
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
  </div>            
  </div>
            <div class="text">
                { data ?
                 <Datausers class="breadcrumb" /> 
                 :
                 <Dataform class="breadcrumb" /> 
                }
            </div>
        </div>
        </>
        );
}

export default AdminDashboard;