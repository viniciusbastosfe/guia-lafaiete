import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MessageSquare,
  Mail,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
} from 'lucide-react'

export default function AdminSuggestions() {
  // Dados mockados para demonstração
  const suggestions = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      subject: 'Sugestão de novo recurso',
      message: 'Seria ótimo ter um sistema de avaliações para os eventos...',
      status: 'pending',
      created_at: '2024-11-24T10:30:00',
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      subject: 'Problema no cadastro',
      message: 'Estou tendo dificuldades para cadastrar minha empresa...',
      status: 'pending',
      created_at: '2024-11-23T15:20:00',
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      subject: 'Elogio à plataforma',
      message: 'Parabéns pelo excelente trabalho! A plataforma está incrível.',
      status: 'resolved',
      created_at: '2024-11-22T09:15:00',
    },
  ]

  const stats = {
    total: suggestions.length,
    pending: suggestions.filter((s) => s.status === 'pending').length,
    resolved: suggestions.filter((s) => s.status === 'resolved').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sugestões e Mensagens</h1>
        <p className="text-gray-600 mt-1">Gerencie mensagens e sugestões dos usuários</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Mensagens</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolvidas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Sugestões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Mensagens Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{suggestion.subject}</h3>
                      <Badge
                        variant={suggestion.status === 'resolved' ? 'default' : 'secondary'}
                      >
                        {suggestion.status === 'resolved' ? 'Resolvida' : 'Pendente'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {suggestion.name}
                      </div>
                      <span>{suggestion.email}</span>
                      <span>
                        {new Date(suggestion.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700">{suggestion.message}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button size="sm" variant="outline" title="Ver detalhes">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {suggestion.status === 'pending' && (
                      <Button size="sm" variant="default" title="Marcar como resolvida">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline" title="Excluir">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {suggestions.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma mensagem</h3>
              <p className="text-gray-600">Você não tem mensagens no momento</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
