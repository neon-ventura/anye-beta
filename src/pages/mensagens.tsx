import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AutoMessage } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ChevronRight, PlusCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MOCK_AUTO_MESSAGES: AutoMessage[] = [
  {
    id: "1",
    type: "AUSÊNCIA",
    name: "Resposta de Ausência",
    message: "Olá! Estou ausente no momento, mas retornarei em breve.",
    active: true,
    triggers: ["ausente", "férias"]
  },
  {
    id: "2",
    type: "FEEDBACK",
    name: "Agradecimento por Feedback",
    message: "Agradecemos seu feedback positivo! Ficamos felizes que gostou do produto.",
    active: false,
    triggers: ["feedback", "avaliação"]
  }
];

const MessageForm = () => {
  const [messageType, setMessageType] = useState("AUSÊNCIA");
  const [messageName, setMessageName] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [triggers, setTriggers] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageName.trim() || !messageContent.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mensagem automática criada",
      description: "A mensagem foi criada com sucesso.",
    });

    // Reset form
    setMessageName("");
    setMessageContent("");
    setTriggers("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="message-type">Tipo de Mensagem</Label>
          <Select defaultValue={messageType} onValueChange={setMessageType}>
            <SelectTrigger id="message-type">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AUSÊNCIA">Ausência</SelectItem>
              <SelectItem value="SAUDAÇÃO">Saudação</SelectItem>
              <SelectItem value="FEEDBACK">Feedback</SelectItem>
              <SelectItem value="SUPORTE">Suporte</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="message-trigger">Gatilho</Label>
          <Select defaultValue="keyword">
            <SelectTrigger id="message-trigger">
              <SelectValue placeholder="Selecione o gatilho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="keyword">Palavra-chave</SelectItem>
              <SelectItem value="time">Tempo</SelectItem>
              <SelectItem value="action">Ação do Cliente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message-name">Nome da Mensagem</Label>
          <Input
            id="message-name"
            value={messageName}
            onChange={(e) => setMessageName(e.target.value)}
            placeholder="Ex: Resposta de Ausência"
          />
        </div>

        <div>
          <Label htmlFor="message-content">Conteúdo da Mensagem</Label>
          <Textarea
            id="message-content"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Digite o conteúdo da mensagem automática..."
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="message-triggers">Palavras-chave de acionamento (separadas por vírgula)</Label>
          <Input
            id="message-triggers"
            value={triggers}
            onChange={(e) => setTriggers(e.target.value)}
            placeholder="Ex: ausente, férias, indisponível"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="message-active"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
          <Label htmlFor="message-active">Ativar mensagem automática</Label>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Salvar Mensagem Automática
      </Button>
    </form>
  );
};

export default function MensagensAutomaticas() {
  const [selectedMessage, setSelectedMessage] = useState<AutoMessage | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Mensagens Automáticas - Anye Parts</title>
      </Helmet>
      
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Mensagens Automáticas</h1>
              <p className="text-muted-foreground">
                Configure mensagens automáticas para seus clientes do Mercado Livre
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>Mensagens Configuradas</CardTitle>
              <CardDescription>
                Mensagens automáticas para diferentes cenários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_AUTO_MESSAGES.map((message) => (
                  <div 
                    key={message.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent"
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{message.name}</span>
                        {message.active ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Inativo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate max-w-md">
                        {message.message}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {message.triggers.map((trigger, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" onClick={() => setSelectedMessage(null)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nova Mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{selectedMessage ? "Editar Mensagem" : "Nova Mensagem"}</CardTitle>
              <CardDescription>
                {selectedMessage 
                  ? "Altere os dados da mensagem automática" 
                  : "Configure uma nova mensagem automática"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MessageForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
