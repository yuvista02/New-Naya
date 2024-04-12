export type TableColumn = { 
  header: string,
  field: string, // Enforce key check with generics
  class?: string,
  sortable?: boolean
}
