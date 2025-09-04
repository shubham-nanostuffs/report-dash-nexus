import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Download, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from "@/types/analytics";
import { exportToCSV, exportToExcel, exportToPDF } from "@/utils/exportUtils";

interface DataTableProps {
  data: AnalyticsData[];
  title: string;
}

export function DataTable({ data, title }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<AnalyticsData>[] = useMemo(
    () => [
      {
        accessorKey: "district",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            District
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "amisp",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            AMISP
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "consumers",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of consumers
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const consumers = parseInt(row.getValue("consumers"));
          return <div className="text-right font-medium">{consumers.toLocaleString()}</div>;
        },
      },
      {
        accessorKey: "messagesAttempted",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of messages attempted (% w.r.t. no. of consumers)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const messages = parseInt(row.getValue("messagesAttempted"));
          const consumers = parseInt(row.getValue("consumers"));
          const percentage = Math.round((messages / consumers) * 100);
          return <div className="text-right font-medium">{messages.toLocaleString()} ({percentage}%)</div>;
        },
      },
      {
        accessorKey: "messagesDelivered",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of messages delivered (% w.r.t. attempted)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const delivered = parseInt(row.getValue("messagesDelivered"));
          const attempted = parseInt(row.getValue("messagesAttempted"));
          const percentage = Math.round((delivered / attempted) * 100);
          return <div className="text-right font-medium">{delivered.toLocaleString()} ({percentage}%)</div>;
        },
      },
      {
        accessorKey: "messagesRead",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of messages read (% w.r.t. delivery)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const read = parseInt(row.getValue("messagesRead"));
          const delivered = parseInt(row.getValue("messagesDelivered"));
          const percentage = Math.round((read / delivered) * 100);
          return <div className="text-right font-medium">{read.toLocaleString()} ({percentage}%)</div>;
        },
      },
      {
        accessorKey: "consumersClicked",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of consumers clicked form (% w.r.t. read)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const clicked = parseInt(row.getValue("consumersClicked"));
          const read = parseInt(row.getValue("messagesRead"));
          const percentage = Math.round((clicked / read) * 100);
          return <div className="text-right font-medium">{clicked.toLocaleString()} ({percentage}%)</div>;
        },
      },
      {
        accessorKey: "consumersSubmitted",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of consumers submitted response (% w.r.t. delivered)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const submitted = parseInt(row.getValue("consumersSubmitted"));
          const delivered = parseInt(row.getValue("messagesDelivered"));
          const percentage = Math.round((submitted / delivered) * 100);
          return <div className="text-right font-medium">{submitted.toLocaleString()} ({percentage}%)</div>;
        },
      },
      // Grouped header for "Facing Meter issue"
      {
        header: "Facing Meter issue (% w.r.t. response recd)",
        columns: [
          {
            accessorKey: "higherMeterReading",
            header: ({ column }) => (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
              >
                Higher meter reading (% w.r.t. issue faced)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            ),
            cell: ({ row }) => {
              const value = parseInt(row.getValue("higherMeterReading"));
              return <div className="text-right font-medium">{value}%</div>;
            },
          },
          {
            accessorKey: "amountCharged",
            header: ({ column }) => (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
              >
                Amount charged during installation (% w.r.t. issue faced)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            ),
            cell: ({ row }) => {
              const value = parseInt(row.getValue("amountCharged"));
              return <div className="text-right font-medium">{value}%</div>;
            },
          },
          {
            accessorKey: "installationNotProper",
            header: ({ column }) => (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
              >
                Installation not proper (% w.r.t. issue faced)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            ),
            cell: ({ row }) => {
              const value = parseInt(row.getValue("installationNotProper"));
              return <div className="text-right font-medium">{value}%</div>;
            },
          },
          {
            accessorKey: "mobileAppNotWorking",
            header: ({ column }) => (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
              >
                Mobile app not working properly (% w.r.t. issue faced)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            ),
            cell: ({ row }) => {
              const value = parseInt(row.getValue("mobileAppNotWorking"));
              return <div className="text-right font-medium">{value}%</div>;
            },
          },
        ],
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    const visibleData = table.getFilteredRowModel().rows.map(row => row.original);
    const filename = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`;
    
    switch (format) {
      case 'csv':
        exportToCSV(visibleData, filename);
        break;
      case 'excel':
        exportToExcel(visibleData, filename);
        break;
      case 'pdf':
        exportToPDF(visibleData, title, filename);
        break;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(String(event.target.value))}
            className="max-w-sm bg-white shadow-card"
          />
        </div>
        
        <div className="flex gap-2">
          {/* Column Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white shadow-card">
                <Settings2 className="mr-2 h-4 w-4" />
                Columns
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-white shadow-elevated">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white shadow-card">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-elevated">
              <DropdownMenuLabel>Export Data</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleExport('csv')}
              >
                Export as CSV
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleExport('excel')}
              >
                Export as Excel
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleExport('pdf')}
              >
                Export as PDF
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow key={headerGroup.id} className="bg-analytics-secondary/30">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                      key={header.id} 
                      className="font-semibold text-center border-r border-analytics-secondary/20 last:border-r-0"
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-analytics-secondary/20 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of{" "}
          {table.getCoreRowModel().rows.length} row(s) shown.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="h-8 w-[70px] rounded border px-2 text-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}