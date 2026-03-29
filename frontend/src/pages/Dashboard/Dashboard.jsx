import React ,{useEffect}from 'react'
import { useNavigate , useLocation} from "react-router-dom"
import CitizenDashboard from "../../components/Dashboard/CitizenDashboard"
import AdminDashboard from "../../components/Dashboard/AdminDashboard"
import StaffDashboard from "../../components/Dashboard/StaffDashboard"

const Dashboard = () => {
    const navigate = useNavigate();
  
    const location = useLocation()
    const user = location.state?.user
    console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user,navigate]);

    if (!user) {
      return <div>Loading...</div>; 
    }

    if(user.role==="citizen")  return <CitizenDashboard user ={user} />
    if(user.role==="staff") return <StaffDashboard user ={user} />
    return <AdminDashboard user ={user} />
}

export default Dashboard
