# 🔍 TESTE DE DEBUG - Execute no Console (F12)

## TESTE 1: Verificar Sessão Atual

```javascript
// Ver se está autenticado
import { supabase } from './src/lib/supabase'

const { data: { session } } = await supabase.auth.getSession()
console.log('🔐 Sessão:', {
  isAuthenticated: !!session,
  user: session?.user,
  role: session?.user?.role
})
```

## TESTE 2: Testar Query Manual

```javascript
// Testar buscar eventos manualmente
const { data, error } = await supabase
  .from('events')
  .select('*')
  .eq('is_active', true)
  .limit(5)

console.log('📊 Eventos:', {
  count: data?.length,
  data: data,
  error: error
})
```

## TESTE 3: Verificar Política RLS

```javascript
// Ver qual role está sendo usado
const { data: { session } } = await supabase.auth.getSession()
console.log('Role:', session ? 'authenticated' : 'anon')
```

## TESTE 4: Testar Logout

```javascript
// Ver se clique funciona
console.log('Testando botão sair...')
document.querySelector('button[title="Sair"]')?.click()

// OU testar diretamente:
const { signOut } = useAuthStore.getState()
await signOut()
```
