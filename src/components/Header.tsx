import { Bot, Captions } from "lucide-react";

export function HeaderComp() {
  return (
    <div className="flex gap-4 justify-center mb-11">
      <Captions size={32} color="#B91C1C" />
      <h1 className="text-3xl font-sans font-bold">
        Caption.IA
      </h1>
      <Bot size={32} color="#00ff00" />
    </div>
  )
}