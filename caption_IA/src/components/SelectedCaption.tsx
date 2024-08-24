import { Path, useFormContext } from "react-hook-form";
import { TFormValue } from "../type/TFormValue";

type SelectedCaptionProps = {
  label: string
  options: { icon: string; value: string; label: string; }[]
  name: Path<TFormValue>
  required: boolean
}

export function SelectedCaption({
  label,
  options,
  name,
  required }: SelectedCaptionProps) {
  const { register } = useFormContext<TFormValue>()

  return (
    <>
      <div>
        <p className="font-bold text-base mb-3">
          {label}
        </p>
        <div>
          <ul className="flex justify-between">
            {options.map((option) => (
              <li key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  {...register(name, { required })}
                  value={option.value}
                  className="hidden peer"
                />
                <label
                  htmlFor={option.value}
                  className="flex gap-1 items-center border-2 w-fit px-2 py-1 rounded peer-checked:border-lime-400"
                >
                  <p className="font-noto text-2xl">
                    {option.icon}
                  </p>
                  <p className="font-bold">
                    {option.label}
                  </p>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}