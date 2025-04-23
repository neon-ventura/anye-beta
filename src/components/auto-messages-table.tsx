
import { AutoMessage } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

interface AutoMessagesTableProps {
  messages: AutoMessage[];
  onToggleActive: (id: string, active: boolean) => void;
}

export function AutoMessagesTable({ messages, onToggleActive }: AutoMessagesTableProps) {
  const [localMessages, setLocalMessages] = useState<AutoMessage[]>(messages);

  const handleToggle = (id: string, active: boolean) => {
    setLocalMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === id ? { ...msg, active } : msg
      )
    );
    
    onToggleActive(id, active);
  };

  return (
    <div className="table-container">
      <table className="product-table">
        <thead className="bg-gray-50 text-xs">
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Mensagem</th>
            <th>Gatilhos</th>
            <th>Status</th>
            <th className="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {localMessages.map((message) => (
            <tr key={message.id} className="border-b row-hover">
              <td className="font-medium">
                {message.name}
              </td>
              <td>
                <Badge variant="outline">
                  {message.type === "absence" 
                    ? "Ausência" 
                    : "Resposta Automática"}
                </Badge>
              </td>
              <td className="max-w-md truncate">
                {message.message}
              </td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {message.triggers.map((trigger, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {trigger === "purchase" 
                        ? "Compra" 
                        : trigger === "question" 
                        ? "Pergunta"
                        : trigger}
                    </Badge>
                  ))}
                </div>
              </td>
              <td>
                <Switch 
                  checked={message.active} 
                  onCheckedChange={(checked) => handleToggle(message.id, checked)}
                />
              </td>
              <td className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
