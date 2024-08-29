import { SubmitHandler, useForm, FormProvider } from "react-hook-form"
import { VideoInput } from "./components/input/InputVideo"
import { TFormValue } from "./type/TFormValue"
import { SelectedCaption } from "./components/SelectedCaption"
import { HeaderComp } from "./components/Header"
import axios, { AxiosError } from "axios"
import { useState } from "react"

function App() {
  const methods = useForm<TFormValue>()
  const [ isNotifyError, setIsNotifyError ] = useState<string>()

  const onSubmit: SubmitHandler<TFormValue> = async (data) => {
    try {
      const formData = new FormData()

      formData.append('video', data.video)
      formData.append('caption', data.caption)

      const res = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log(res)
    } catch (error) {
      if(error instanceof AxiosError){
        if(error.response?.status === 400 && error.response!){
          setIsNotifyError(error.response.data.message)
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
            { isNotifyError && <p>{isNotifyError}</p>}
            <SelectedCaption
              label="Select a language:"
              name="caption"
              required
              options={[
                {
                  icon: "🇧🇷",
                  value: "pt-BR",
                  label: "Portuguese"
                },
                {
                  icon: "🇬🇧",
                  value: "en-US",
                  label: "English"
                },
                {
                  icon: "🇪🇸",
                  value: "es-ES",
                  label: "Español"
                }
              ]}
            />

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
