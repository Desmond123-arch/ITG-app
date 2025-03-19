import { ArrowDown, Bell, Search } from "lucide-react";
import { Input } from "./ui/input";
import { ItgIcon } from "@/assets/images";

const Header = () => {
    return (
        <div className="flex justify-between w-full mb-10">
            <h1 className="text-2xl font-semibold">Home</h1>
            <div className="flex gap-5 items-center">
                <div className="group focus-within:border-black/50 bg-white flex h-9 gap-2 items-center overflow-hidden rounded-md border-black/50 px-1">
                    <Search className="text-black/50"/>
                    <Input className="shadow-none outline-none p-0 border-none focus-visible:ring-0" type="text" placeholder="Search anything..."/>
                </div>
                <div className="flex gap-2 items-center">
                    <Bell/>
                    <div className="rounded-full overflow-hidden w-7 h-7">
                        <img src={ItgIcon} alt="Profile Picture" />
                    </div>
                    <h1>John Doe</h1>
                    <ArrowDown/>
                </div>
            </div>
        </div>
    );
}

export default Header;