import { Bell, Menu, Play, Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { ProfilePic } from "@/assets/images";
import { Link, useLocation } from "react-router-dom";
import toTitle from "@/utils/ToTitle";
import { RootState, AppDispatch } from "@/store";
import { toggleSidebar } from "@/store/sidebarSlice";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector, useSelector } from "react-redux";
const useAppDispatch = () => useReduxDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const Header = () => {
    const location = useLocation();
    const user = useSelector((state: RootState) => state.auth.user)
    const pageName = location.pathname === "/" ? "Home" : toTitle(location.pathname)

    const showSidebar = useAppSelector((state) => state.sidebar.showSidebar);
    const dispatch = useAppDispatch();
    const changeMenu = () => {
        dispatch(toggleSidebar());
    };

    return (
        <div className="flex md:flex-row flex-col justify-between w-full mb-5 md:mb-10 md:items-center gap-2">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div onClick={changeMenu} className='lg:hidden text-black cursor-pointer relative top-[2px]'>
                        {
                        showSidebar ? <X/> : <Menu/>
                        }
                    </div>
                    <h1 className="text-2xl font-semibold">{pageName}</h1>
                </div>
                <div className="cursor-pointer relative md:hidden block">
                    <Bell size={20}/>
                    <div className="absolute top-[-3px] right-[-1px] w-3 h-3 border-2 border-[#f1f2f4] bg-green-700 rounded-full"></div>
                </div>
            </div>
            <div className="gap-5 items-center justify-between hidden md:flex">
                <div className="group focus-within:border-black/50 bg-white flex h-9 gap-2 items-center overflow-hidden rounded-md border-black/50 px-1">
                    <Search className="text-black/50"/>
                    <Input className="shadow-none outline-none p-0 border-none focus-visible:ring-0" type="text" placeholder="Search anything..."/>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="cursor-pointer relative">
                        <Bell size={20}/>
                        <div className="absolute top-[-3px] right-[-1px] w-3 h-3 border-2 border-[#f1f2f4] bg-green-700 rounded-full"></div>
                    </div>
                    <Link to="/sign-up" className="rounded-full overflow-hidden w-7 h-7">
                        <img className="w-full h-full object-cover" src={ProfilePic} alt="Profile Picture" />
                    </Link>
                    <h1 className="font-semibold text-sm">{user?.name}</h1>
                    <div className="rotate-90 cursor-pointer text-gray-500"><Play size={20}/></div>
                </div>
            </div>
        </div>
    );
}

export default Header;