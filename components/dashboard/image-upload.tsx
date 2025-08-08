"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface LocalPreview {
  url: string
  file: File
}

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [localPreviews, setLocalPreviews] = useState<LocalPreview[]>([])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > maxImages) {
        toast.error(`Máximo ${maxImages} imagens permitidas`)
        return
      }

      const newPreviews: LocalPreview[] = acceptedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))
      setLocalPreviews((prev) => [...prev, ...newPreviews])

      setUploading(true)
      try {
        const uploadPromises = acceptedFiles.map(async (file, idx) => {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("upload_preset", "autoway")

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            },
          )

          const data = await response.json()
          console.log("[ImageUpload] Cloudinary response:", data)
          setLocalPreviews((prev) => prev.filter((p) => p.file !== file))
          if (!data.secure_url) {
            console.error("[ImageUpload] Falha: secure_url vazio ou inválido", data)
          }
          return data.secure_url
        })

        const uploadedUrls = await Promise.all(uploadPromises)
        console.log("[ImageUpload] URLs recebidas após upload:", uploadedUrls)
        onImagesChange([...images, ...uploadedUrls])
        setTimeout(() => {
          console.log("[ImageUpload] Array final de imagens:", [...images, ...uploadedUrls])
        }, 100)
        toast.success("enviadas com sucesso!")
      } catch (error) {
        toast.error("Erro ao enviar imagens")
      } finally {
        setUploading(false)
      }
    },
    [images, onImagesChange, maxImages],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: maxImages - images.length,
    disabled: uploading || images.length >= maxImages,
  })

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      {(localPreviews.length > 0 || images.length > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          
          {localPreviews.map((preview, index) => (
            <Card key={preview.url} className="relative overflow-hidden opacity-70">
              <div className="aspect-video relative">
                <Image src={preview.url} alt={`Preview ${index + 1}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                </div>
              </div>
            </Card>
          ))}
          
          {images.map((image, index) => (
            <Card key={image} className="relative overflow-hidden">
              <div className="aspect-video relative">
                <Image src={image || "/placeholder.svg"} alt={`Upload ${index + 1}`} fill className="object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {images.length + localPreviews.length < maxImages && (
        <Card
          {...getRootProps()}
          className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p>Enviando imagens...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                {isDragActive ? "Solte as imagens aqui..." : "Clique ou arraste imagens aqui"}
              </p>
              <p className="text-xs text-gray-500">
                {images.length + localPreviews.length}/{maxImages} imagens • PNG, JPG, WEBP até 10MB
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
