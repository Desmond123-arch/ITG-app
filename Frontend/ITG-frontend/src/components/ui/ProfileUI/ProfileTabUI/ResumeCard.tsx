import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { FileBadge, Eye, Ellipsis } from 'lucide-react';

const ResumeCard = () => (
    <div className="border rounded-md grid grid-cols-[20px_1fr_20px] p-5 w-max gap-5 min-w-[450px]">
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
                <PopoverContent className='bg-white border flex flex-col gap-1 rounded-md p-1'>
                    <h1 className='rounded-sm px-2 py-1 hover:bg-gray-100 cursor-pointer'>Preview</h1>
                    <h1 className='rounded-sm px-2 py-1 hover:bg-gray-100 cursor-pointer'>Change</h1>
                    <h1 className='rounded-sm px-2 py-1 hover:bg-gray-100 cursor-pointer'>Download</h1>
                    <h1 className='rounded-sm px-2 py-1 hover:bg-red-200 text-red-600 cursor-pointer '>Delete</h1>
                </PopoverContent>
            </Popover>
        </div>
    </div>
);

export default ResumeCard