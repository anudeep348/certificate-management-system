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
import { ArrowUpDown, Download, Eye, MoreHorizontal } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "@/lib/actions/certificateAction";
import LoadingSpinner from "../LoadingSpinner";

type Certificate = {
  id: string;
  recipientName: string;
  recipientEmail: string;
  courseName: string;
  courseId: string;
  certificateUrl: string;
  generatedAt: Date;
};

// const data: Certificate[] = [
//   {
//     id: "1",
//     recipientId: "1",
//     recipientName: "John Doe",
//     recipientEmail: "john.doe@example.com",
//     courseId: "WD101",
//     courseName: "Web Development Fundamentals",
//     uniqueId: "WD101-001",
//     certificateUrl: "/certificates/WD101-001.pdf",
//     generatedAt: "2023-12-15T10:30:00Z",
//     status: "sent",
//   },
//   {
//     id: "2",
//     recipientId: "2",
//     recipientName: "Jane Smith",
//     recipientEmail: "jane.smith@example.com",
//     courseId: "DS202",
//     courseName: "Data Science Bootcamp",
//     uniqueId: "DS202-001",
//     certificateUrl: "/certificates/DS202-001.pdf",
//     generatedAt: "2023-12-16T14:45:00Z",
//     status: "viewed",
//   },
//   {
//     id: "3",
//     recipientId: "4",
//     recipientName: "Sarah Williams",
//     recipientEmail: "sarah.w@example.com",
//     courseId: "WD101",
//     courseName: "Web Development Fundamentals",
//     uniqueId: "WD101-002",
//     certificateUrl: "/certificates/WD101-002.pdf",
//     generatedAt: "2023-12-17T09:15:00Z",
//     status: "generated",
//   },
// ];

export function CertificateList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [courseFilter, setCourseFilter] = useState<string>("all");

  const { data = [], isPending } = useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const certificates = await getCertificates();
      return certificates.map((cert) => ({
        ...cert,
        generatedAt: new Date(cert.generatedAt),
      }));
    },
  });

  const columns: ColumnDef<Certificate>[] = [
    {
      accessorKey: "recipientName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Recipient
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("recipientName")}</div>
      ),
    },
    {
      accessorKey: "recipientEmail",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("recipientEmail")}</div>,
    },
    {
      accessorKey: "courseName",
      header: "Course Name",
      cell: ({ row }) => <div>{row.getValue("courseName")}</div>,
    },
    {
      accessorKey: "generatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Generated At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          {new Date(row.getValue("generatedAt")).toLocaleDateString()}{" "}
          {new Date(row.getValue("generatedAt")).toLocaleTimeString()}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const certificate = row.original;

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
                <Link
                  href={certificate.certificateUrl}
                  target="_blank"
                  className="flex items-center"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Certificate
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={certificate.certificateUrl}
                  download
                  className="flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Resend Email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredData =
    courseFilter === "all"
      ? data
      : data.filter((certificate) => certificate.courseId === courseFilter);

  const table = useReactTable({
    data: filteredData,
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

  // Get unique course IDs for filtering
  const uniqueCourses = Array.from(
    new Set(data.map((cert) => cert.courseId))
  ).map((courseId) => {
    const course = data.find((cert) => cert.courseId === courseId);
    return {
      id: courseId,
      name: course?.courseName || courseId,
    };
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
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter recipients..."
          value={
            (table.getColumn("recipientName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("recipientName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Filter by course:
          </span>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {uniqueCourses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name} ({})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                  No certificates found.
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
