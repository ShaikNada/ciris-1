import React, { useState } from 'react';
import { FolderSearch, Upload, Filter, Eye, Download, FileText, Image, Video, Database, FileCode } from 'lucide-react';
import { mockEvidence, mockFIRs } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Evidence } from '@/types/crime';

const EvidenceManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);

  const typeIcons = {
    document: FileText,
    image: Image,
    video: Video,
    forensic: Database,
    digital: FileCode
  };

  const typeColors = {
    document: 'bg-primary/20 text-primary border-primary/30',
    image: 'bg-accent/20 text-accent border-accent/30',
    video: 'bg-destructive/20 text-destructive border-destructive/30',
    forensic: 'bg-warning/20 text-warning border-warning/30',
    digital: 'bg-info/20 text-info border-info/30'
  };

  const statusColors = {
    pending: 'bg-warning/20 text-warning',
    analyzing: 'bg-primary/20 text-primary',
    verified: 'bg-accent/20 text-accent',
    inconclusive: 'bg-muted text-muted-foreground'
  };

  const filteredEvidence = mockEvidence.filter(ev => {
    const matchesSearch = ev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || ev.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getFIRNumber = (firId: string) => {
    const fir = mockFIRs.find(f => f.id === firId);
    return fir?.firNumber || 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FolderSearch className="w-7 h-7 text-primary" />
            Evidence Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Digital evidence collection and forensic analysis
          </p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Upload className="w-4 h-4" />
          Upload Evidence
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.entries(typeIcons).map(([type, Icon]) => {
          const count = mockEvidence.filter(e => e.type === type).length;
          return (
            <Card key={type} className="bg-card border-border">
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', typeColors[type as keyof typeof typeColors])}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground capitalize">{type}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FolderSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search evidence by name or description..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="forensic">Forensic</SelectItem>
            <SelectItem value="digital">Digital</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvidence.map((evidence) => {
          const Icon = typeIcons[evidence.type];
          return (
            <Card key={evidence.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0', typeColors[evidence.type])}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{evidence.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{evidence.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className={cn('text-xs capitalize', typeColors[evidence.type])}>
                        {evidence.type}
                      </Badge>
                      <Badge className={cn('text-xs capitalize', statusColors[evidence.status])}>
                        {evidence.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <div className="text-xs text-muted-foreground">
                        <p>FIR: {getFIRNumber(evidence.firId)}</p>
                        <p>{evidence.dateCollected}</p>
                      </div>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedEvidence(evidence)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-card border-border">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Icon className="w-5 h-5 text-primary" />
                                {evidence.name}
                              </DialogTitle>
                              <DialogDescription>Evidence details</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Type</p>
                                  <p className="font-medium capitalize">{evidence.type}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Status</p>
                                  <Badge className={cn('capitalize', statusColors[evidence.status])}>
                                    {evidence.status}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Date Collected</p>
                                  <p className="font-medium">{evidence.dateCollected}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Collected By</p>
                                  <p className="font-medium">{evidence.collectedBy}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Description</p>
                                <p className="text-sm mt-1">{evidence.description}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Linked FIR</p>
                                <p className="font-medium">{getFIRNumber(evidence.firId)}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredEvidence.length === 0 && (
        <div className="text-center py-12">
          <FolderSearch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No evidence found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default EvidenceManagement;
