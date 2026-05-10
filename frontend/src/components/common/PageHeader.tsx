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
    <div className="mb-5">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="opacity-40">/</span>}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground/70">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <h1 className="text-2xl font-semibold text-foreground tracking-tight">{title}</h1>
    </div>
  )
}
