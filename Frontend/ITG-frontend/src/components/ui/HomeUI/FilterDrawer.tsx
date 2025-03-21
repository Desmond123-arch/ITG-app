import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";
import { Button } from "../button";
import { SlidersHorizontal } from "lucide-react";
import Filters from "./Filters";

const FilterDrawer: React.FC = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <Button className="bg-white text-black hover:bg-white/30 flex items-center gap-2">
                    <SlidersHorizontal />
                    <span>Filter</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 h-screen">
                <DrawerHeader>
                    <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto">
                    <Filters />
                </div>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline" className="w-full mx-1">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default FilterDrawer;
