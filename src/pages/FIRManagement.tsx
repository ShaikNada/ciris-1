import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { mockFIRs } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { FIR } from '@/types/crime';

const FIRManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedFIR, setSelectedFIR] = useState<FIR | null>(null);

  const severityColors = {
    low: 'bg-accent/20 text-accent border-accent/30',
    medium: 'bg-primary/20 text-primary border-primary/30',
    high: 'bg-warning/20 text-warning border-warning/30',
    critical: 'bg-destructive/20 text-destructive border-destructive/30'
  };

  const statusColors = {
    pending: 'bg-warning/20 text-warning',
    investigating: 'bg-primary/20 text-primary',
    solved: 'bg-accent/20 text-accent',
    closed: 'bg-muted text-muted-foreground'
  };

  const filteredFIRs = mockFIRs.filter(fir => {
    const matchesSearch = fir.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fir.crimeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fir.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || fir.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-7 h-7 text-primary" />
            FIR Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage First Information Reports and case classifications
          </p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          New FIR
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by FIR number, crime type, location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="solved">Solved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* FIR Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead>FIR Number</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Crime Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Officer</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFIRs.map((fir) => (
              <TableRow key={fir.id} className="hover:bg-secondary/30">
                <TableCell className="font-medium">{fir.firNumber}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(fir.dateTime).toLocaleString()}
                </TableCell>
                <TableCell>{fir.crimeType}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('capitalize', severityColors[fir.severity])}>
                    {fir.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn('capitalize', statusColors[fir.status])}>
                    {fir.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{fir.district}</TableCell>
                <TableCell className="text-muted-foreground">{fir.assignedOfficer}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedFIR(fir)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-card border-border">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            {fir.firNumber}
                          </DialogTitle>
                          <DialogDescription>
                            Case details and information
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Crime Type</p>
                            <p className="font-medium">{fir.crimeType}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Severity</p>
                            <Badge variant="outline" className={cn('capitalize', severityColors[fir.severity])}>
                              {fir.severity}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Status</p>
                            <Badge className={cn('capitalize', statusColors[fir.status])}>
                              {fir.status}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Evidence Count</p>
                            <p className="font-medium">{fir.evidenceCount} items</p>
                          </div>
                          <div className="col-span-2 space-y-1">
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{fir.location}</p>
                          </div>
                          <div className="col-span-2 space-y-1">
                            <p className="text-sm text-muted-foreground">Description</p>
                            <p className="text-sm">{fir.description}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Complainant</p>
                            <p className="font-medium">{fir.complainant}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Assigned Officer</p>
                            <p className="font-medium">{fir.assignedOfficer}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold">{mockFIRs.length}</p>
          <p className="text-sm text-muted-foreground">Total FIRs</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold text-warning">{mockFIRs.filter(f => f.status === 'pending').length}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold text-primary">{mockFIRs.filter(f => f.status === 'investigating').length}</p>
          <p className="text-sm text-muted-foreground">Investigating</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold text-accent">{mockFIRs.filter(f => f.status === 'solved').length}</p>
          <p className="text-sm text-muted-foreground">Solved</p>
        </div>
      </div>
    </div>
  );
};

export default FIRManagement;
