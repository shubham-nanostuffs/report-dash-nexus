import React, { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Download, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { exportToCSV, exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { AnalyticsData } from "@/types/analytics";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Extend the ColumnMeta interface to support group headers
declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends unknown, TValue> {
    isGroupHeader?: boolean;
    colSpan?: number;
  }
}

interface DataTableProps {
  data: AnalyticsData[];
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<AnalyticsData>[] = useMemo(
    () => [
      // Basic Info Section
      {
        accessorKey: "sno",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            S.No
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("sno")}</div>
        ),
      },
      {
        accessorKey: "state",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            State
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("state")}</div>,
      },
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
        cell: ({ row }) => <div>{row.getValue("district")}</div>,
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
        cell: ({ row }) => <div>{row.getValue("amisp")}</div>,
      },

      // Consumer & Message Flow Section
      {
        accessorKey: "no_of_consumers",
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
          const value = parseInt(row.getValue("no_of_consumers"));
          return (
            <div className="text-right">
              <div className="font-medium">{value.toLocaleString()}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "messages_attempted",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of messages attempted
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const attempted = parseInt(row.getValue("messages_attempted"));
          const consumers = parseInt(row.getValue("no_of_consumers"));
          const percentage =
            consumers > 0 ? ((attempted / consumers) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{attempted.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "messages_delivered",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of messages delivered
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const delivered = parseInt(row.getValue("messages_delivered"));
          const attempted = parseInt(row.getValue("messages_attempted"));
          const percentage =
            attempted > 0 ? ((delivered / attempted) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{delivered.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "messages_read",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of messages read
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const read = parseInt(row.getValue("messages_read"));
          const delivered = parseInt(row.getValue("messages_delivered"));
          const percentage =
            delivered > 0 ? ((read / delivered) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{read.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "consumers_clicked_form",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of consumers clicked form
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const clicked = parseInt(row.getValue("consumers_clicked_form"));
          const read = parseInt(row.getValue("messages_read"));
          const percentage =
            read > 0 ? ((clicked / read) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{clicked.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "consumers_submitted_response",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No. of consumers submitted response
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const delivered = parseInt(row.getValue("messages_delivered"));
          const percentage =
            delivered > 0 ? ((submitted / delivered) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{submitted.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },

      // Facing Meter Issue Section - Group Header
      {
        accessorKey: "meterIssueGroup",
        header: "Facing Meter Issue",
        meta: { isGroupHeader: true, colSpan: 4 },
        cell: () => null,
      },
      {
        accessorKey: "issue_faced",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Yes, issue faced
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const issueFaced = parseInt(row.getValue("issue_faced"));
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const percentage =
            submitted > 0 ? ((issueFaced / submitted) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{issueFaced.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "higher_meter_reading",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Higher meter reading
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const higherReading = parseInt(row.getValue("higher_meter_reading"));
          const issueFaced = parseInt(row.getValue("issue_faced"));
          const percentage =
            issueFaced > 0
              ? ((higherReading / issueFaced) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {higherReading.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "amount_charged",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Amount charged during installation
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const amountCharged = parseInt(row.getValue("amount_charged"));
          const issueFaced = parseInt(row.getValue("issue_faced"));
          const percentage =
            issueFaced > 0
              ? ((amountCharged / issueFaced) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {amountCharged.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "installation_not_proper",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Installation not proper
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const installationNotProper = parseInt(
            row.getValue("installation_not_proper")
          );
          const issueFaced = parseInt(row.getValue("issue_faced"));
          const percentage =
            issueFaced > 0
              ? ((installationNotProper / issueFaced) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {installationNotProper.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "mobile_app_not_working",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Mobile app not working properly
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const mobileAppNotWorking = parseInt(
            row.getValue("mobile_app_not_working")
          );
          const issueFaced = parseInt(row.getValue("issue_faced"));
          const percentage =
            issueFaced > 0
              ? ((mobileAppNotWorking / issueFaced) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {mobileAppNotWorking.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },

      // App Installation Section - Group Header
      {
        accessorKey: "appInstallationGroup",
        header: "App Installation",
        meta: { isGroupHeader: true, colSpan: 3 },
        cell: () => null,
      },
      {
        accessorKey: "not_installed",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Not Installed
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const notInstalled = parseInt(row.getValue("not_installed"));
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const percentage =
            submitted > 0
              ? ((notInstalled / submitted) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{notInstalled.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "not_interested",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            I am not interested
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const notInterested = parseInt(row.getValue("not_interested"));
          const notInstalled = parseInt(row.getValue("not_installed"));
          const percentage =
            notInstalled > 0
              ? ((notInterested / notInstalled) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {notInterested.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "not_aware",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            I am not aware
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const notAware = parseInt(row.getValue("not_aware"));
          const notInstalled = parseInt(row.getValue("not_installed"));
          const percentage =
            notInstalled > 0
              ? ((notAware / notInstalled) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{notAware.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },

      // Features Available Section - Group Header
      {
        accessorKey: "featuresAvailableGroup",
        header: "Features Available",
        meta: { isGroupHeader: true, colSpan: 3 },
        cell: () => null,
      },
      {
        accessorKey: "recharge_bill_option",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Recharge/Bill option available
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const rechargeBillOption = parseInt(
            row.getValue("recharge_bill_option")
          );
          const installedUsers =
            parseInt(row.getValue("consumers_submitted_response")) -
            parseInt(row.getValue("not_installed"));
          const percentage =
            installedUsers > 0
              ? ((rechargeBillOption / installedUsers) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {rechargeBillOption.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "real_time_consumption",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Real time consumption
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const realTimeConsumption = parseInt(
            row.getValue("real_time_consumption")
          );
          const installedUsers =
            parseInt(row.getValue("consumers_submitted_response")) -
            parseInt(row.getValue("not_installed"));
          const percentage =
            installedUsers > 0
              ? ((realTimeConsumption / installedUsers) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {realTimeConsumption.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "consumption_analysis",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Consumption analysis
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const consumptionAnalysis = parseInt(
            row.getValue("consumption_analysis")
          );
          const installedUsers =
            parseInt(row.getValue("consumers_submitted_response")) -
            parseInt(row.getValue("not_installed"));
          const percentage =
            installedUsers > 0
              ? ((consumptionAnalysis / installedUsers) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {consumptionAnalysis.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },

      // Ease of Understanding Bill Section - Group Header
      {
        accessorKey: "easeOfUnderstandingGroup",
        header: "Ease of Understanding Bill",
        meta: { isGroupHeader: true, colSpan: 5 },
        cell: () => null,
      },
      {
        accessorKey: "easy_to_understand",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Yes, easy to understand
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const easyToUnderstand = parseInt(row.getValue("easy_to_understand"));
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const percentage =
            submitted > 0
              ? ((easyToUnderstand / submitted) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {easyToUnderstand.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "too_complex",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No, Too complex
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const tooComplex = parseInt(row.getValue("too_complex"));
          const notUnderstanding =
            parseInt(row.getValue("consumers_submitted_response")) -
            parseInt(row.getValue("easy_to_understand"));
          const percentage =
            notUnderstanding > 0
              ? ((tooComplex / notUnderstanding) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{tooComplex.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "not_in_local_language",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No, Not in local language
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const notInLocalLanguage = parseInt(
            row.getValue("not_in_local_language")
          );
          const notUnderstanding =
            parseInt(row.getValue("consumers_submitted_response")) -
            parseInt(row.getValue("easy_to_understand"));
          const percentage =
            notUnderstanding > 0
              ? ((notInLocalLanguage / notUnderstanding) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {notInLocalLanguage.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "insufficient_information",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            No, sufficient information not provided
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const insufficientInformation = parseInt(
            row.getValue("insufficient_information")
          );
          const notUnderstanding =
            parseInt(row.getValue("consumers_submitted_response")) -
            parseInt(row.getValue("easy_to_understand"));
          const percentage =
            notUnderstanding > 0
              ? ((insufficientInformation / notUnderstanding) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {insufficientInformation.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "other_issues",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Other issues
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const otherIssues = parseInt(row.getValue("other_issues"));
          const notUnderstanding =
            parseInt(row.getValue("consumers_submitted_response")) -
            parseInt(row.getValue("easy_to_understand"));
          const percentage =
            notUnderstanding > 0
              ? ((otherIssues / notUnderstanding) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{otherIssues.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },

      // Bill Payment & App Usability Section - Group Header
      {
        accessorKey: "billPaymentGroup",
        header: "Bill Payment & App Usability",
        meta: { isGroupHeader: true, colSpan: 2 },
        cell: () => null,
      },
      {
        accessorKey: "bill_payment_easy",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Bill payment is easier
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const billPaymentEasy = parseInt(row.getValue("bill_payment_easy"));
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const percentage =
            submitted > 0
              ? ((billPaymentEasy / submitted) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {billPaymentEasy.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "mobile_app_easy_to_use",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Mobile app easy to use
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const mobileAppEasyToUse = parseInt(
            row.getValue("mobile_app_easy_to_use")
          );
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const percentage =
            submitted > 0
              ? ((mobileAppEasyToUse / submitted) * 100).toFixed(1)
              : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">
                {mobileAppEasyToUse.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },

      // Overall Experience Section - Group Header
      {
        accessorKey: "overallExperienceGroup",
        header: "Overall Experience",
        meta: { isGroupHeader: true, colSpan: 4 },
        cell: () => null,
      },
      {
        accessorKey: "excellent",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Excellent
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const excellent = parseInt(row.getValue("excellent"));
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const percentage =
            submitted > 0 ? ((excellent / submitted) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{excellent.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "good",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Good
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const good = parseInt(row.getValue("good"));
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const percentage =
            submitted > 0 ? ((good / submitted) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{good.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "average",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Average
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const average = parseInt(row.getValue("average"));
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const percentage =
            submitted > 0 ? ((average / submitted) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{average.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "bad",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent justify-end"
          >
            Bad
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const bad = parseInt(row.getValue("bad"));
          const submitted = parseInt(
            row.getValue("consumers_submitted_response")
          );
          const percentage =
            submitted > 0 ? ((bad / submitted) * 100).toFixed(1) : "0.0";
          return (
            <div className="text-right">
              <div className="font-medium">{bad.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ({percentage}%)
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    const filteredData = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);
    const filename = `analytics_report_${format}_${
      new Date().toISOString().split("T")[0]
    }`;

    switch (format) {
      case "csv":
        exportToCSV(filteredData, filename);
        break;
      case "excel":
        exportToExcel(filteredData, filename);
        break;
      case "pdf":
        exportToPDF(filteredData, "Analytics Report", filename);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          {/* Column Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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

          {/* Export Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel")}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {/* Single Header Row - Only Individual Column Headers with Tooltips */}
              <TableRow className="bg-analytics-secondary/20">
                {table.getHeaderGroups()[0].headers.map((header) => {
                  const isGroupHeader =
                    header.column.columnDef.meta?.isGroupHeader;

                  if (isGroupHeader) {
                    return null; // Skip group headers entirely
                  } else {
                    // Find the group header for this column
                    let groupTitle = "";
                    const columnIndex = table
                      .getHeaderGroups()[0]
                      .headers.findIndex((h) => h.id === header.id);

                    // Look backwards to find the most recent group header
                    for (let i = columnIndex - 1; i >= 0; i--) {
                      const prevHeader = table.getHeaderGroups()[0].headers[i];
                      if (prevHeader.column.columnDef.meta?.isGroupHeader) {
                        groupTitle = prevHeader.column.columnDef
                          .header as string;
                        break;
                      }
                    }

                    // Only show tooltip if there's a group title
                    if (groupTitle) {
                      return (
                        <TableHead
                          key={header.id}
                          className="font-semibold min-w-[150px]"
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-black">{groupTitle}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableHead>
                      );
                    } else {
                      // No tooltip for standalone columns
                      return (
                        <TableHead
                          key={header.id}
                          className="font-semibold min-w-[150px]"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    }
                  }
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-analytics-secondary/20 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isGroupHeader =
                        cell.column.columnDef.meta?.isGroupHeader;

                      if (isGroupHeader) {
                        return null; // Skip group header cells in body
                      } else {
                        return (
                          <TableCell key={cell.id} className="min-w-[150px]">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      }
                    })}
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
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
