import React, { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashBoardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="grid sm:grid-cols-3 max-w-3xl gap-4">
        <div className="shadow pr-14 bg-white rounded pl-4 py-4 flex items-start gap-4 text-center cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-12" src={assets.dashboard_icon_1} alt="" />
          <div className="text-center">
            <p className="font-semibold">{dashboardData.blogs}</p>
            <p className="font-light text-gray-500 text-sm">Blog</p>
          </div>
        </div>
        <div className="shadow pr-14 bg-white rounded pl-4 py-4 flex items-start gap-4 text-center cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-12" src={assets.dashboard_icon_2} alt="" />
          <div className="text-center">
            <p className="font-semibold">{dashboardData.comments}</p>
            <p className="font-light text-gray-500 text-sm">Comments</p>
          </div>
        </div>
        <div className="shadow pr-14 bg-white rounded pl-4 py-4 flex items-start gap-4 text-center cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-12" src={assets.dashboard_icon_3} alt="" />
          <div className="text-center">
            <p className="font-semibold">{dashboardData.drafts}</p>
            <p className="font-light text-gray-500 text-sm">Drafts</p>
          </div>
        </div>
      </div>

      {/* Recent 5 blogs data */}
      <div className="relative max-w-4xl overflow-x-auto scrollbar-hide shadow rounded-lg my-20 bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-gray-600 text-xs uppercase text-left bg-gray-100">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">BLOG TITLE</th>
              <th className="px-4 py-3 max-sm:hidden">DATE</th>
              <th className="px-4 py-3 max-sm:hidden">STATUS</th>
              <th className="px-4 py-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentBlogs.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                index={index}
                fetchBlog={fetchDashBoardData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
