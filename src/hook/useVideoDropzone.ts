import { useDropzone } from "react-dropzone";
import { Path, useFormContext } from "react-hook-form";
import { TFormValue } from "../type/TFormValue";

export function useVideoDropzone(name: Path<TFormValue>) {
  const { setValue } = useFormContext<TFormValue>();

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.mkv'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setValue(name, acceptedFiles[0], { shouldValidate: true });
    },
  });

  return {
    getRootProps,
    getInputProps,
    acceptedFile: acceptedFiles[0],
    fileRejection: fileRejections[0],
  };
}
