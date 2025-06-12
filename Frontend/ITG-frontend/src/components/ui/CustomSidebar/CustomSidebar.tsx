import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  CircleUserRound, 
  Clock, 
  LayoutDashboard, 
  MessageCircle, 
  Settings, 
} from 'lucide-react';
import LinkItem from './LinkItem';
import { ItgLogo } from '@/assets/images';

const CustomSidebar: React.FC = () => {

  const items = [
    {
      title: "Home",
      url: "/",
      icon: LayoutDashboard
    },
    {
      title: "Company",
      url: "/company",
      icon: Briefcase
    },
    {
      title: "Profile",
      url: "/profile",
      icon: CircleUserRound
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: Calendar
    },
    {
      title: "History",
      url: "/history",
      icon: Clock
    },
    {
      title: "Messages",
      url: "/messages",
      icon: MessageCircle
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings
    },
  ];

  return (
    <nav className="bg-[#110d59] relative h-screen lg:w-[230px] w-[270px] py-3 px-4 text-white">
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
