import { Check, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Path, useFormContext } from 'react-hook-form'
import { TFormValue } from "../type/TFormValue";

type InputProps = {
  label: Path<TFormValue>
  name: Path<TFormValue>
  required: boolean
}

export function VideoInput({ label, name, required }: InputProps) {
  const { setValue, register } = useFormContext<TFormValue>() 
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.mkv'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setValue(name, acceptedFiles[0], { shouldValidate: true })
    }
  })

  const file = acceptedFiles[0]
  const fileRejection = fileRejections[0]

  return (
    <>
      {
        file ? (
          <div className="border-2 border-[#00ff00] rounded-lg w-full py-4 flex items-center justify-center gap-3">
            <Check size={34} color="#00ff00" />
            <p className="font-bold text-sm">
              Vídeo carregado com <span className="text-[#00ff00]">sucesso!</span>
            </p>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="border-2 border-white rounded-lg w-full py-4 cursor-pointer"
          >
            <input
              type="file"
              {...getInputProps()}
              {...register(label, { required })}
              multiple={false}
            />
            <div className="flex items-center justify-center gap-3">
              <Upload size={34} color="#fff" />
              <p className="font-bold text-sm">Clique a aqui para adicionar um video!</p>
            </div>
          </div>
        )
      }
      {
        fileRejection && (
          <p className="text-red-500 flex gap-1 items-center">
            <X color="#ef4444" size={16} />
            <span className="font-medium italic">
              O formato do arquivo deve ser .mp4 ou .mkv
            </span>
          </p>
        )
      }
    </>
  )
}