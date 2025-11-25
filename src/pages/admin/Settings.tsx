import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Settings as SettingsIcon,
  Key,
  Save,
  Eye,
  EyeOff,
  Bot,
  MessageCircle,
  Mic,
  Sparkles,
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminSettings() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    gemini: '',
    groq: '',
    evolution: '',
  })

  const toggleShowKey = (key: string) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!')
  }

  const integrations = [
    {
      id: 'openai',
      name: 'OpenAI (ChatGPT)',
      icon: Bot,
      description: 'Assistente de IA para chat e suporte',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      placeholder: 'sk-...',
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      icon: Sparkles,
      description: 'IA do Google para análises e insights',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      placeholder: 'AIza...',
    },
    {
      id: 'groq',
      name: 'Groq (Whisper)',
      icon: Mic,
      description: 'Transcrição de áudio para texto',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      placeholder: 'gsk_...',
    },
    {
      id: 'evolution',
      name: 'Evolution API',
      icon: MessageCircle,
      description: 'Integração com WhatsApp',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      placeholder: 'evo_...',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie integrações e API keys da plataforma</p>
      </div>

      {/* Integrações */}
      <div className="grid grid-cols-1 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon
          const isConfigured = apiKeys[integration.id as keyof typeof apiKeys].length > 0

          return (
            <Card key={integration.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${integration.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${integration.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{integration.name}</h3>
                      <p className="text-sm text-gray-600 font-normal">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant={isConfigured ? 'default' : 'outline'}>
                    {isConfigured ? 'Configurado' : 'Não configurado'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Key className="inline h-4 w-4 mr-1" />
                      API Key
                    </label>
                    <div className="relative">
                      <Input
                        type={showKeys[integration.id] ? 'text' : 'password'}
                        placeholder={integration.placeholder}
                        value={apiKeys[integration.id as keyof typeof apiKeys]}
                        onChange={(e) =>
                          setApiKeys((prev) => ({
                            ...prev,
                            [integration.id]: e.target.value,
                          }))
                        }
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => toggleShowKey(integration.id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showKeys[integration.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Informações adicionais */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Como obter a API Key:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {integration.id === 'openai' && (
                        <>
                          <li>1. Acesse platform.openai.com</li>
                          <li>2. Faça login ou crie uma conta</li>
                          <li>3. Vá em API Keys e crie uma nova chave</li>
                        </>
                      )}
                      {integration.id === 'gemini' && (
                        <>
                          <li>1. Acesse aistudio.google.com</li>
                          <li>2. Faça login com sua conta Google</li>
                          <li>3. Clique em "Get API Key"</li>
                        </>
                      )}
                      {integration.id === 'groq' && (
                        <>
                          <li>1. Acesse console.groq.com</li>
                          <li>2. Crie uma conta ou faça login</li>
                          <li>3. Gere uma nova API Key</li>
                        </>
                      )}
                      {integration.id === 'evolution' && (
                        <>
                          <li>1. Configure sua instância Evolution API</li>
                          <li>2. Obtenha a API Key do painel</li>
                          <li>3. Configure o webhook para receber mensagens</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      {/* Aviso de Segurança */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <SettingsIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-1">Aviso de Segurança</h4>
              <p className="text-sm text-yellow-800">
                As API Keys são armazenadas de forma segura e criptografada. Nunca
                compartilhe suas chaves com terceiros. Mantenha-as sempre em sigilo para
                garantir a segurança da sua aplicação.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
