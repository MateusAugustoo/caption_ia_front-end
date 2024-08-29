import { Path } from 'react-hook-form'
import { TFormValue } from "../../type/TFormValue";
import { InputVideoChecked } from "./InputVideoChecked";
import { MessageRejection } from "./MessageInputRejection";
import { useVideoDropzone } from "../../hook/useVideoDropzone";
import { VideoDropzone } from "./VideoDropzone";


type InputProps = {
  label: Path<TFormValue>
  name: Path<TFormValue>
  required: boolean
}

export function VideoInput({ label, name, required }: InputProps) {
  const { getRootProps, getInputProps, acceptedFile, fileRejection } = useVideoDropzone(name);

  return (
    <>
      {
        acceptedFile ? (
          <InputVideoChecked />
        ) : (
          <VideoDropzone
            {...getRootProps()}
            getInputProps={getInputProps}
            label={label}
            required={required}
          />
        )
      }
      {fileRejection && <MessageRejection />}
    </>
  )
}