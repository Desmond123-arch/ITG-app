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
  MessageCircle,
  ListOrdered,
  Settings,
} from 'lucide-react';

import LinkItem from './LinkItem';
import { ItgLogo } from '@/assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const CustomSidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  const roleBasedItems = {
    seeker: [
      { title: "Home", url: "/", icon: LayoutDashboard },
      { title: "Profile", url: "/profile", icon: UserCircle2 },
      { title: "Saved Jobs", url: "/saved_jobs", icon: Bookmark },
      { title: "Applications", url: "/applications", icon: FileText },
      { title: "Messages", url: "/messages", icon: MessageCircle },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
    employer: [
      { title: "Home", url: "/", icon: LayoutDashboard },
      { title: "Company", url: "/company", icon: Building2 },
      { title: "Post a Job", url: "/post_job", icon: PlusCircle },
      { title: "Job Listings", url: "/job_listings", icon: ListOrdered },
      { title: "Applicants", url: "/applicants", icon: UserCheck },
      { title: "Messages", url: "/messages", icon: MessageCircle },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
    admin: [
      { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
      { title: "Manage Users", url: "/manage_users", icon: Users2 },
      { title: "Manage Jobs", url: "/manage_jobs", icon: ListOrdered },
      { title: "Messages", url: "/messages", icon: MessageCircle },
      { title: "Settings", url: "/settings", icon: Settings },
    ]
  }

  const items = roleBasedItems.seeker

  return (
    <nav className="bg-[#110d59] relative h-screen lg:w-[230px] w-[270px] py-3 px-4 text-white overflow-y-scroll hidden_scrollbar">
      <div className="flex gap-3 items-center mb-5">
        <img src={ItgLogo} className='h-10' alt="ITG Logo" />
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <LinkItem key={index} item={item}/>
        ))}
      </ul>
    </nav>
  );
};

export default CustomSidebar;
