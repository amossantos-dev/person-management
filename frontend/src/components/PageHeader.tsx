import { Link } from 'react-router-dom'

interface Breadcrumb {
  label: string
  to?: string
}

interface PageHeaderProps {
  title: string
  breadcrumbs?: Breadcrumb[]
}

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-1">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span>/</span>}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-blue-600 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-800">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    </div>
  )
}
