import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AppLayout } from '@/components/common/AppLayout'
import { LoginPage } from '@/pages/LoginPage'
import { PersonDetailPage } from '@/pages/PersonDetailPage'
import { PersonFormPage } from '@/pages/PersonFormPage'
import { PersonsListPage } from '@/pages/PersonsListPage'
import { PrivateRoute } from '@/routes/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/persons" replace />} />
            <Route path="/persons" element={<PersonsListPage />} />
            <Route path="/persons/new" element={<PersonFormPage />} />
            <Route path="/persons/:id" element={<PersonDetailPage />} />
            <Route path="/persons/:id/edit" element={<PersonFormPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
