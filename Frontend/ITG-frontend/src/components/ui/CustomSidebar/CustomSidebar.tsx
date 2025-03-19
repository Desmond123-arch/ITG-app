import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  LayoutDashboard, 
  Menu, 
  MessageCircle, 
  Settings, 
  Ticket, 
  X
} from 'lucide-react';
import LinkItem from './LinkItem';
import { ItgLogo } from '@/assets/images';

const CustomSidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true)

  const items = [
    {
      title: "Home",
      url: "/",
      icon: LayoutDashboard
    },
    {
      title: "Event",
      url: "/event",
      icon: Ticket
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
      title: "Company",
      url: "/company",
      icon: Briefcase
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

  const changeMenu = () => {
    setShowSidebar(prev => !prev)
  }

  return (
    <nav className="bg-[#110d59] relative h-screen w-[270px] py-3 px-4 text-white">
      {/* <div onClick={changeMenu} className='md:hidden absolute right-[-30px] text-black top-[17px] cursor-pointer'>
        {
          showSidebar ? <X/> : <Menu/>
        }
      </div> */}
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
