import { SubmitHandler, useForm, FormProvider } from "react-hook-form"
import { VideoInput } from "./components/input/InputVideo"
import { TFormValue } from "./type/TFormValue"
import { SelectedCaption } from "./components/SelectedCaption"
import { HeaderComp } from "./components/Header"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { X } from "lucide-react"
// import { SelectedColorCaption } from "./components/SelectedColorCaption"

function App() {
  const methods = useForm<TFormValue>()
  const [isNotifyError, setIsNotifyError] = useState<string>()

  const onSubmit: SubmitHandler<TFormValue> = async (data) => {
    try {
      const formData = new FormData()

      formData.append('video', data.video)
      formData.append('caption', data.caption)
      // formData.append('colorCaption', data.colorCaption)

      const res = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log(res)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 && error.response!) {
          setIsNotifyError(error.response.data)
          console.log(error.response.data)
        }
      }
    }
  }

  return (
    <>
      <HeaderComp />
      <main>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <VideoInput
              label="video"
              name="video"
              required
            />
            {isNotifyError && 
              <p className="font-light italic text-sm text-red-500 flex items-center gap-2">
                <X  size={16}/><span>{isNotifyError}</span>
              </p>}
            <SelectedCaption
              label="Select a language:"
              name="caption"
              required
              options={[
                {
                  icon: "🇧🇷",
                  value: "pt",
                  label: "Portuguese"
                },
                {
                  icon: "🇬🇧",
                  value: "en",
                  label: "English"
                },
                {
                  icon: "🇪🇸",
                  value: "es",
                  label: "Español"
                }
              ]}
            />

            {/* <div>
              <SelectedColorCaption 
                label="Select a color:"
                name="colorCaption"
                required
                options={[
                  {
                    text: "White",
                    value: "white",
                    style: 'text-white'
                  },
                  {
                    text: "Red",
                    value: "red",
                    style: 'text-red-400'
                  },
                  {
                    text: "Yellow",
                    value: "yellow",
                    style: 'text-yellow-400'
                  },
                ]}
              />
            </div> */}

            <button
              type="submit"
              className="bg-lime-400 text-black font-bold py-2 px-4 rounded"
            >
              Subtitle
            </button>
          </form>
        </FormProvider>
      </main>
    </>
  )
}

export default App
