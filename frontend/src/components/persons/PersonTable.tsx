import { useNavigate } from 'react-router-dom'
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Person } from '@/types'
import { formatDate } from '@/utils/date'

interface PersonTableProps {
  persons: Person[]
  loading: boolean
  selected: Set<string>
  onToggle: (id: string) => void
  onToggleAll: () => void
  onDeleteClick: (person: Person) => void
}

function ShimmerCell() {
  return (
    <TableCell className="py-3">
      <div
        className="h-4 w-full rounded"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite linear',
        }}
      />
    </TableCell>
  )
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 7 }).map((_, j) => (
            <ShimmerCell key={j} />
          ))}
        </TableRow>
      ))}
    </>
  )
}

const MotionTableRow = motion(TableRow)

export function PersonTable({ persons, loading, selected, onToggle, onToggleAll, onDeleteClick }: PersonTableProps) {
  const navigate = useNavigate()
  const allSelected = persons.length > 0 && persons.every((p) => selected.has(p.id))
  const someSelected = persons.some((p) => selected.has(p.id)) && !allSelected

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableHead className="w-10 h-11 text-xs font-medium uppercase tracking-wide">
            <Checkbox
              checked={allSelected ? true : someSelected ? 'indeterminate' : false}
              onCheckedChange={onToggleAll}
              aria-label="Selecionar todos"
            />
          </TableHead>
          <TableHead className="h-11 text-xs font-medium uppercase tracking-wide">Nome</TableHead>
          <TableHead className="h-11 text-xs font-medium uppercase tracking-wide">Nascimento</TableHead>
          <TableHead className="h-11 text-xs font-medium uppercase tracking-wide">Cidade</TableHead>
          <TableHead className="h-11 text-xs font-medium uppercase tracking-wide">Estado</TableHead>
          <TableHead className="h-11 text-xs font-medium uppercase tracking-wide">País</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <SkeletonRows />
        ) : persons.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-12 text-sm text-muted-foreground">
              Nenhuma pessoa encontrada.
            </TableCell>
          </TableRow>
        ) : (
          persons.map((p, index) => (
            <MotionTableRow
              key={p.id}
              className="cursor-pointer"
              data-state={selected.has(p.id) ? 'selected' : undefined}
              onClick={() => navigate(`/persons/${p.id}`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ backgroundColor: 'rgba(124,58,237,0.08)' } as never}
              style={{ borderLeft: '2px solid transparent', transition: 'border-left-color 0.2s ease' } as never}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderLeftColor = 'rgba(124,58,237,0.8)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'
              }}
            >
              <TableCell className="py-2.5" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selected.has(p.id)}
                  onCheckedChange={() => onToggle(p.id)}
                  aria-label={`Selecionar ${p.name}`}
                />
              </TableCell>
              <TableCell className="py-2.5 font-medium">{p.name}</TableCell>
              <TableCell className="py-2.5 text-muted-foreground">{formatDate(p.dateOfBirth)}</TableCell>
              <TableCell className="py-2.5 text-muted-foreground">{p.address.city}</TableCell>
              <TableCell className="py-2.5 text-muted-foreground">{p.address.state}</TableCell>
              <TableCell className="py-2.5 text-muted-foreground">{p.address.country}</TableCell>
              <TableCell className="py-2.5" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/persons/${p.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/persons/${p.id}/edit`)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDeleteClick(p)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </MotionTableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
