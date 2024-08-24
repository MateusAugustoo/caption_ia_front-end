import { SubmitHandler, useForm, FormProvider } from "react-hook-form"
import { VideoInput } from "./components/InputVideo"
import { TFormValue } from "./type/TFormValue"
import { SelectedCaption } from "./components/SelectedCaption"
import { HeaderComp } from "./components/Header"
import axios from "axios"
function App() {
  const methods = useForm<TFormValue>()

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

      console.log(res.data)
    } catch (error) {
      console.error(error)
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
            <SelectedCaption
              label="Escolha uma lingua:"
              name="caption"
              required
              options={[
                {
                  icon: "🇧🇷",
                  value: "pt-BR",
                  label: "Português"
                },
                {
                  icon: "🇬🇧",
                  value: "en-US",
                  label: "Inglês"
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
              Legendar
            </button>
          </form>
        </FormProvider>
      </main>
    </>
  )
}

export default App
