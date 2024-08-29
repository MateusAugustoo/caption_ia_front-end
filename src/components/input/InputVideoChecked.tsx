import { Check } from "lucide-react";

export function InputVideoChecked() {
  return (
    <div className="border-2 border-[#00ff00] rounded-lg w-full py-4 flex items-center justify-center gap-3">
      <Check size={34} color="#00ff00" />
      <p className="font-bold text-sm">
        Vídeo carregado com <span className="text-[#00ff00]">sucesso!</span>
      </p>
    </div>
  )
}  