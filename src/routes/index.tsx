import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

import Home from '@/pages/public/Home'
import Events from '@/pages/public/Events'
import EventDetail from '@/pages/public/EventDetail'
import Companies from '@/pages/public/Companies'
import CompanyDetail from '@/pages/public/CompanyDetail'
import Influencers from '@/pages/public/Influencers'
import Musicians from '@/pages/public/Musicians'
import Giveaways from '@/pages/public/Giveaways'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'

import AdminDashboard from '@/pages/admin/Dashboard'
import AdminEvents from '@/pages/admin/Events'
import AdminCompanies from '@/pages/admin/Companies'
import AdminProfiles from '@/pages/admin/Profiles'
import AdminGiveaways from '@/pages/admin/AdminGiveaways'
import AdminBanners from '@/pages/admin/Banners'
import AdminUsers from '@/pages/admin/Users'
import AdminSuggestions from '@/pages/admin/Suggestions'
import AdminSettings from '@/pages/admin/Settings'
import EventForm from '@/pages/admin/EventForm'
import CompanyForm from '@/pages/admin/CompanyForm'
import ProfileForm from '@/pages/admin/ProfileForm'
import GiveawayForm from '@/pages/admin/GiveawayForm'

import UserPanel from '@/pages/user/UserPanel'
import Debug from '@/pages/Debug'
import TestConnection from '@/pages/TestConnection'
import TestData from '@/pages/TestData'
import TestQuery from '@/pages/TestQuery'
import SearchResults from '@/pages/public/SearchResults'
import DesignShowcase from '@/pages/DesignShowcase'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/debug" element={<Debug />} />
        <Route path="/test" element={<TestConnection />} />
        <Route path="/test-data" element={<TestData />} />
        <Route path="/test-query" element={<TestQuery />} />
        <Route path="/busca" element={<SearchResults />} />
        <Route path="/design" element={<DesignShowcase />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/eventos/:id" element={<EventDetail />} />
        <Route path="/empresas" element={<Companies />} />
        <Route path="/empresas/:id" element={<CompanyDetail />} />
        <Route path="/influenciadores" element={<Influencers />} />
        <Route path="/musicos" element={<Musicians />} />
        <Route path="/sorteios" element={<Giveaways />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        
        {/* Painel do Usuário */}
        <Route path="/painel" element={
          <ProtectedRoute>
            <UserPanel />
          </ProtectedRoute>
        } />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="eventos" element={<AdminEvents />} />
        <Route path="eventos/novo" element={<EventForm />} />
        <Route path="eventos/:id" element={<EventForm />} />
        <Route path="empresas" element={<AdminCompanies />} />
        <Route path="empresas/nova" element={<CompanyForm />} />
        <Route path="empresas/:id" element={<CompanyForm />} />
        <Route path="perfis" element={<AdminProfiles />} />
        <Route path="perfis/novo" element={<ProfileForm />} />
        <Route path="perfis/:id" element={<ProfileForm />} />
        <Route path="sorteios" element={<AdminGiveaways />} />
        <Route path="sorteios/novo" element={<GiveawayForm />} />
        <Route path="sorteios/:id" element={<GiveawayForm />} />
        <Route path="banners" element={<AdminBanners />} />
        <Route path="usuarios" element={<AdminUsers />} />
        <Route path="sugestoes" element={<AdminSuggestions />} />
        <Route path="configuracoes" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
