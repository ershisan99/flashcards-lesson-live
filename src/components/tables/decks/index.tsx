import { ComponentPropsWithoutRef, MouseEventHandler } from 'react'

import { clsx } from 'clsx'

import { ChevronUp } from '../../../assets/icons'

import s from './decks.module.scss'
export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type Column = {
  title: string
  key: string
  isSortable?: boolean
}

type Props = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Array<Column>
    sort: Sort
    onSort: (sort: Sort) => void
  },
  'children'
>

const dataAttributes = {
  sortable: 'data-sortable',
  name: 'data-name',
} as const

export const TableHeader = ({ columns, onSort, sort }: Props) => {
  const handleSorting: MouseEventHandler<HTMLTableRowElement> = e => {
    if (!(e.target instanceof HTMLTableCellElement)) return

    const isSortable = e.target.getAttribute(dataAttributes.sortable)
    const key = e.target.getAttribute(dataAttributes.name)

    if (key === null) throw new Error('No data-name found!')

    if (!isSortable || isSortable !== 'true') return

    if (key !== sort?.key) {
      return onSort({ key, direction: 'asc' })
    }
    if (sort.direction === 'asc') {
      return onSort({ key, direction: 'desc' })
    }

    onSort(null)
  }

  return (
    <thead className={s.root}>
      <tr onClick={handleSorting}>
        {columns.map(column => {
          const showSort = column.isSortable && sort && sort.key === column.key

          return (
            <th
              {...{
                [dataAttributes.sortable]: column.isSortable,
                [dataAttributes.name]: column.key,
              }}
              key={column.title}
            >
              <span>
                {column.title}
                {showSort && (
                  <ChevronUp className={clsx(sort.direction === 'desc' && s.chevronDown)} />
                )}
              </span>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
