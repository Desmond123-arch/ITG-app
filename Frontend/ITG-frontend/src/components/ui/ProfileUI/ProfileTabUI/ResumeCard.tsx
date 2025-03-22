import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { FileBadge, Eye, Ellipsis } from 'lucide-react';

const ResumeCard = () => (
    <div className="border rounded-md flex p-5 w-max gap-5">
        <div className="relative top-1">
            <FileBadge />
        </div>
        <div className="flex flex-col">
            <h1 className="font-semibold text-black text-xl">John Doe Resume.pdf</h1>
            <p>Date added: 12/1/2024</p>
            <div className="flex gap-2">
                <Eye />
                <p>Visible to hiring employers</p>
            </div>
        </div>
        <div>
            <Popover>
                <PopoverTrigger>
                    <Ellipsis />
                </PopoverTrigger>
                <PopoverContent>
                    <h1>Preview</h1>
                    <h1>Change</h1>
                    <h1>Download</h1>
                    <h1 className="text-red-500">Delete</h1>
                </PopoverContent>
            </Popover>
        </div>
    </div>
);

export default ResumeCard