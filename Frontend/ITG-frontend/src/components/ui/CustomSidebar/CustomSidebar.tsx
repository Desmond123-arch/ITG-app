import React from 'react';
import {
  LayoutDashboard,
  Building2,
  UserCircle2,
  Bookmark,
  FileText,
  BarChart3,
  Users2,
  PlusCircle,
  UserCheck,
  ListOrdered,
  // Settings,
  LogOut,
} from 'lucide-react';
import LinkItem from './LinkItem';
import { ItgLogo } from '@/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/authSlice';

const CustomSidebar: React.FC = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const roleBasedItems = {
    seeker: [
      { title: "Home", url: "/", icon: LayoutDashboard },
      { title: "Company", url: "/company", icon: Building2 },
      { title: "Profile", url: "/profile", icon: UserCircle2 },
      { title: "Saved Jobs", url: "/saved_jobs", icon: Bookmark },
      { title: "Applications", url: "/job_seeker_applications", icon: FileText },
      // { title: "Settings", url: "/settings", icon: Settings },
    ],
    employer: [
      { title: "Home", url: "/", icon: LayoutDashboard },
      { title: "Company", url: "/company", icon: Building2 },
      { title: "Post a Job", url: "/post", icon: PlusCircle },
      { title: "Job Listings", url: "/job_listings", icon: ListOrdered },
      { title: "Applicants", url: "/applicants", icon: UserCheck },
      { title: "Profile", url: "/profile", icon: UserCircle2 },
      // { title: "Settings", url: "/settings", icon: Settings },
    ],
    admin: [
      { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
      { title: "Manage Users", url: "/manage_users", icon: Users2 },
      { title: "Manage Jobs", url: "/manage_jobs", icon: ListOrdered },
      { title: "Profile", url: "/profile", icon: UserCircle2 },
      // { title: "Settings", url: "/settings", icon: Settings },
    ]
  }

  const items = role == 'admin' ? roleBasedItems.admin : role == 'employer' ? roleBasedItems.employer : roleBasedItems.seeker

  console.log(role)
  return (
    <nav className="bg-[#110d59] relative h-screen lg:w-[230px] w-[270px] py-3 px-4 text-white overflow-y-scroll hidden_scrollbar">
      <div className="flex gap-3 items-center mb-5">
        <img src={ItgLogo} className='h-10' alt="ITG Logo" />
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <LinkItem key={index} item={item}/>
        ))}

        <li
          onClick={handleLogout}
          className="hover:bg-white/20 cursor-pointer text-white/80 flex items-center gap-3 font-normal leading-5 rounded-md p-2 transition-colors"
          >
            <LogOut/>
            <span className='text-sm font-semibold'>Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default CustomSidebar;
