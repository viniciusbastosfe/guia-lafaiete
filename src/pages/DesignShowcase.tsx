/**
 * Design Showcase - Demonstração do Design System Clean
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { Calendar, Building2, Heart, Share2, Check } from 'lucide-react'
import { SEO } from '@/components/SEO'

export default function DesignShowcase() {
  return (
    <>
      <SEO title="Design Showcase" description="Demonstração do Design System Clean v3.0" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="section-clean-sm bg-white border-b border-gray-200">
          <div className="container-clean">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Design System Clean v3.0
            </h1>
            <p className="text-lg text-gray-600">
              Minimalista, Moderno e Profissional
            </p>
          </div>
        </div>

        <div className="section-clean">
          <div className="container-clean space-y-24">
            
            {/* ========== BUTTONS ========== */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Buttons</h2>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="btn-clean btn-primary-clean">
                  <Heart className="w-4 h-4" />
                  Primary Button
                </button>
                
                <button className="btn-clean btn-secondary-clean">
                  <Share2 className="w-4 h-4" />
                  Secondary Button
                </button>
                
                <button className="btn-clean btn-ghost-clean">
                  Ghost Button
                </button>
                
                <button className="btn-clean btn-primary-clean" disabled style={{opacity: 0.5, cursor: 'not-allowed'}}>
                  Disabled
                </button>
              </div>

              <div className="card-clean p-6 bg-gray-900">
                <p className="text-white mb-4 font-medium">Buttons on dark background:</p>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-clean btn-primary-clean">Primary</button>
                  <button className="btn-clean" style={{background: 'white', color: '#262626'}}>
                    White Button
                  </button>
                  <button className="btn-clean" style={{background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)'}}>
                    Ghost
                  </button>
                </div>
              </div>
            </section>

            {/* ========== CARDS ========== */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Cards</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card Simples */}
                <div className="card-clean">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Card Title</h3>
                      <p className="text-sm text-gray-500">Subtitle</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Este é um card clean com bordersutis e sem sombra por padrão. 
                    Hover para ver o efeito.
                  </p>
                  <button className="btn-clean btn-ghost-clean text-sm">
                    Ver mais
                  </button>
                </div>

                {/* Card com Imagem */}
                <div className="card-clean !p-0 overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-red-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Card com Imagem</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Perfeito para eventos e empresas.
                    </p>
                    <button className="btn-clean btn-primary-clean w-full">
                      Ver detalhes
                    </button>
                  </div>
                </div>

                {/* Card Compacto */}
                <div className="card-clean card-clean-compact">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Card Compacto</h4>
                      <p className="text-gray-600 text-xs mt-1">
                        Menos padding, ideal para listas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ========== BADGES ========== */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Badges</h2>
              
              <div className="flex flex-wrap gap-3">
                <span className="badge-clean">Default</span>
                <span className="badge-clean badge-primary-clean">Primary</span>
                <span className="badge-clean badge-success-clean">
                  <Check className="w-3 h-3" />
                  Success
                </span>
                <span className="badge-clean badge-error-clean">Error</span>
                <span className="badge-clean" style={{background: '#dbeafe', color: '#3b82f6'}}>
                  Info
                </span>
                <span className="badge-clean" style={{background: '#fef3c7', color: '#f59e0b'}}>
                  Warning
                </span>
              </div>
            </section>

            {/* ========== INPUTS ========== */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Inputs</h2>
              
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo
                  </label>
                  <input 
                    type="text" 
                    className="input-clean"
                    placeholder="Digite seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="input-clean"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea 
                    className="input-clean"
                    rows={4}
                    placeholder="Digite sua mensagem..."
                  />
                </div>

                <button className="btn-clean btn-primary-clean w-full">
                  Enviar formulário
                </button>
              </div>
            </section>

            {/* ========== TYPOGRAPHY ========== */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Typography</h2>
              
              <div className="space-y-6">
                <div>
                  <h1 className="text-6xl font-bold text-gray-900 mb-2">Heading 1</h1>
                  <code className="text-xs text-gray-500">text-6xl font-bold</code>
                </div>
                
                <div>
                  <h2 className="text-5xl font-bold text-gray-900 mb-2">Heading 2</h2>
                  <code className="text-xs text-gray-500">text-5xl font-bold</code>
                </div>
                
                <div>
                  <h3 className="text-4xl font-semibold text-gray-900 mb-2">Heading 3</h3>
                  <code className="text-xs text-gray-500">text-4xl font-semibold</code>
                </div>
                
                <div>
                  <h4 className="text-2xl font-semibold text-gray-900 mb-2">Heading 4</h4>
                  <code className="text-xs text-gray-500">text-2xl font-semibold</code>
                </div>

                <div className="max-w-2xl">
                  <p className="text-base text-gray-600 leading-relaxed mb-4">
                    Este é um parágrafo de exemplo usando o Design System Clean. 
                    A tipografia foi cuidadosamente escolhida para proporcionar 
                    excelente legibilidade e hierarquia visual clara.
                  </p>
                  <code className="text-xs text-gray-500">text-base text-gray-600 leading-relaxed</code>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Texto secundário menor para descrições e labels.
                  </p>
                  <code className="text-xs text-gray-500">text-sm text-gray-500</code>
                </div>
              </div>
            </section>

            {/* ========== COLORS ========== */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Colors</h2>
              
              {/* Primary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary</h3>
                <div className="flex gap-2">
                  <div className="flex-1 h-20 rounded-lg bg-red-600 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">#f31100</span>
                  </div>
                </div>
              </div>

              {/* Neutrals */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Neutrals</h3>
                <div className="grid grid-cols-10 gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                    <div key={shade} className="space-y-1">
                      <div 
                        className={`h-16 rounded-lg bg-gray-${shade} border border-gray-200`}
                        style={{backgroundColor: `var(--gray-${shade})`}}
                      />
                      <span className="text-xs text-gray-600 block text-center">
                        {shade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ========== SPACING ========== */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Spacing Scale</h2>
              
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map(size => (
                  <div key={size} className="flex items-center gap-4">
                    <code className="text-sm text-gray-600 w-24">--spacing-{size}</code>
                    <div 
                      className="h-8 bg-red-500 rounded"
                      style={{width: `${size * 0.25}rem`}}
                    />
                    <span className="text-xs text-gray-500">{size * 4}px</span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="section-clean-sm bg-white border-t border-gray-200">
          <div className="container-clean text-center">
            <p className="text-gray-600">
              Design System Clean v3.0 • Vinícius Bastos
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
