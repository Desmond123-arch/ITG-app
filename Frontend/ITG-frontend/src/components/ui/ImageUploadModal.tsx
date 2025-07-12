import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { UploadCloud } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { updateImage } from '@/store/authSlice'

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
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (file: File) => {
    setFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileChange(droppedFile)
    }
  }

  const handleUpdate = async () => {
    if (!file) return
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/images/upload?isUpdate=true`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      const publicUrl = res?.data?.data?.publicUrl

      if (!publicUrl) {
        throw new Error('Upload succeeded but no public URL returned.')
      }

      dispatch(updateImage(publicUrl))
      onUpdate(publicUrl)

      setFile(null)
      setPreview(null)
      onOpenChange(false)
    } catch (error) {
      console.error('Image upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (!open) {
      setFile(null)
      setPreview(null)
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
                src={preview || initialImage}
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
                const selectedFile = e.target.files?.[0]
                if (selectedFile) handleFileChange(selectedFile)
              }}
            />
          </div>

          <div className="p-4 border-t bg-white flex justify-end gap-3">
            <Button onClick={() => onOpenChange(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!file || isUploading}>
              {isUploading ? 'Uploading...' : 'Update'}
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageUploadModal
