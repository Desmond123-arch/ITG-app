import { UploadCloud } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { updateImage } from '@/store/authSlice';
import React, { useRef, useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialImage: string
  onUpdate: (newImage: string) => void
  title?: string
}

const ImageUploadModal: React.FC<Props> = ({
  open,
  onOpenChange,
  initialImage,
  onUpdate,
  title = 'Update Profile Picture'
}) => {
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [tempImage, setTempImage] = useState<string | null>(null)

  const handleFileChange = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        setTempImage(reader.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileChange(file)
    }
  }

  const handleUpdate = () => {
    if (tempImage) {
      dispatch(updateImage(tempImage))
      onUpdate(tempImage)
      setTempImage(null)
      onOpenChange(false)
    }
  }

  useEffect(() => {
    if (!open) {
      setTempImage(null)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md w-full max-h-[90vh] bg-white shadow-xl rounded-md border border-gray-200 p-0 overflow-hidden"
      >
        <div className="flex flex-col h-full max-h-[90vh]">

          <div className="p-6 border-b">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                {title}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div
            className="flex-grow overflow-y-auto p-6"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-full mb-3 rounded overflow-hidden border bg-gray-50 max-h-[300px]">
              <img
                src={tempImage || initialImage}
                alt="Preview"
                className="w-full object-contain max-h-[300px]"
              />
            </div>

            <UploadCloud className="h-10 w-10 text-blue-500 mb-3 mx-auto" />
            <p className="font-medium text-gray-700 mb-2 text-center">Drag & Drop or Click to upload</p>
            <p className="text-sm text-gray-500 text-center">JPG, PNG under 2MB</p>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileChange(file)
              }}
            />
          </div>

          <div className="p-4 border-t bg-white flex justify-end gap-3">
            <Button onClick={() => onOpenChange(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!tempImage}>
              Update
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageUploadModal
