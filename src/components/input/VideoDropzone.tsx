import { useDropzone } from "react-dropzone"
import { Path } from "react-hook-form"
import { TFormValue } from "../../type/TFormValue"
import { Upload } from "lucide-react"
import { forwardRef } from "react"

type VideoDropzoneProps = {
  getInputProps: ReturnType<typeof useDropzone>['getInputProps']
  label: Path<TFormValue>
  required: boolean
} & React.HtmlHTMLAttributes<HTMLDivElement>

const VideoDropzone = forwardRef<HTMLDivElement, VideoDropzoneProps>(
  ({ getInputProps, label, required, ...rest }, ref) => {
    return (
      <div 
        {...rest} 
        ref={ref} 
        className="border-2 border-white rounded-lg w-full py-4 cursor-pointer"
      >
        <input
          type="file"
          {...getInputProps()}
          multiple={false}
          aria-required={required}
          aria-label={label}
        />
        <div className="flex items-center justify-center gap-3">
          <Upload size={34} color="#fff" />
          <p className="font-bold text-sm">Click here to add a video!</p>
        </div>
      </div>
    )
  }
)

VideoDropzone.displayName = "VideoDropzone"
export { VideoDropzone}
