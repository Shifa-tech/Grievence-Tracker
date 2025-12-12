import React from 'react'
import {useNavigate} from "react-router-dom"
import CitizenDashboard from "../../components/Dashboard/CitizenDashboard"
import AdminDashboard from "../../components/Dashboard/AdminDashboard"
import StaffDashboard from "../../components/Dashboard/StaffDashboard"


const Dashboard = ({user}) => {
    const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

    if(user.role=="citizen")  return <CitizenDashboard/>
    if(user.role=="staff") return <StaffDashboard/>
    return <AdminDashboard/>
}

export default Dashboard
