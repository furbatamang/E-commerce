import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";
import { useEffect } from "react";
import { useMemo, useState } from "react";

export default function Home() {
  const [userStat, setUserStat] = useState([])
  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Nov",
    "Dec"
  ],[])
 
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const res = await axios.get('http://localhost:3001/api/users/status', {
          headers:{
            token:JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token,
          }
        });
        res.data.map((item) => {
            setUserStat(prev => [
              ...prev,
              {name: MONTHS[item._id-1], "Active User": item.total}
            ])
        })
      }catch(err){
        console.log(err)
      }
    }
    fetchUser()
  },[MONTHS])
  console.log(userStat)
  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart data={userStat} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
