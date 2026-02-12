
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Campaigns } from './pages/Campaigns';
import { CampaignDetails } from './pages/CampaignDetails';
import { MyCampaigns } from './pages/MyCampaigns';
import { SubmitProof } from './pages/SubmitProof';
import { RequestPayout } from './pages/RequestPayout';
import { BrandDashboard } from './pages/BrandDashboard';
import { CreateCampaign } from './pages/CreateCampaign';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:id" element={<CampaignDetails />} />
            
            {/* Creator Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['creator', 'admin']} />}>
                <Route path="/me/campaigns" element={<MyCampaigns />} />
                <Route path="/submit/:joinId" element={<SubmitProof />} />
                <Route path="/payout/:joinId" element={<RequestPayout />} />
            </Route>

            {/* Brand Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['brand', 'admin']} />}>
                <Route path="/brand/dashboard" element={<BrandDashboard />} />
                <Route path="/brand/create" element={<CreateCampaign />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
