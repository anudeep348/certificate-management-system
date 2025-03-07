"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getRecipients } from "@/lib/actions/recipientActions";
import LoadingSpinner from "../LoadingSpinner";

type Recipient = {
  id: string;
  name: string;
  email: string;
  courseName: string;
  certificateUrl: string | undefined;
};

// const data: Recipient[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     uniqueId: "WD101-001",
//     courseId: "WD101",
//     courseName: "Web Development Fundamentals",
//     certificateUrl: "/certificates/WD101-001.pdf",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     uniqueId: "DS202-001",
//     courseId: "DS202",
//     courseName: "Data Science Bootcamp",
//     certificateUrl: "/certificates/DS202-001.pdf",
//   },
//   {
//     id: "3",
//     name: "Michael Johnson",
//     email: "michael.j@example.com",
//     uniqueId: "UX303-001",
//     courseId: "UX303",
//     courseName: "UX Design Principles",
//     certificateUrl: null,
//   },
//   {
//     id: "4",
//     name: "Sarah Williams",
//     email: "sarah.w@example.com",
//     uniqueId: "WD101-002",
//     courseId: "WD101",
//     courseName: "Web Development Fundamentals",
//     certificateUrl: "/certificates/WD101-002.pdf",
//   },
//   {
//     id: "5",
//     name: "Robert Brown",
//     email: "robert.b@example.com",
//     uniqueId: "DS202-002",
//     courseId: "DS202",
//     courseName: "Data Science Bootcamp",
//     certificateUrl: null,
//   },
// ];

export function RecipientList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data = [], isPending } = useQuery({
    queryKey: ["recipents"],
    queryFn: async () => await getRecipients(),
  });

  const columns: ColumnDef<Recipient>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "courseName",
      header: "Course Name",
      cell: ({ row }) => <div>{row.getValue("courseName")}</div>,
    },
    {
      accessorKey: "certificateUrl",
      header: "Certificate",
      cell: ({ row }) => {
        const certificateUrl = row.getValue("certificateUrl") as string | null;
        return certificateUrl ? (
          <Badge variant="outline" className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            Available
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-muted">
            Not Generated
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const recipient = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/recipients/${recipient.id}`}>View details</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/recipients/${recipient.id}/edit`}
                  className="flex items-center"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
              {recipient.certificateUrl && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={recipient.certificateUrl}
                      target="_blank"
                      className="flex items-center"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (isPending) {
    return (
      <div className="text-center mt-4">
        <LoadingSpinner size={"lg"} />
      </div>
    );
  }

  if (!data || !data.length)
    return (
      <div className="text-2xl text-center mt-16">
        No courses found. Please create a course to view them.
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter recipients..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  No recipients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
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
  );
}
