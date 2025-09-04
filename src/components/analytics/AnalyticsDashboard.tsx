import { useState, useMemo } from "react";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./DataTable";
import { Filters } from "./Filters";
import { reportData, filterOptions } from "@/data/sampleData";
import { AnalyticsData } from "@/types/analytics";

export function AnalyticsDashboard() {
  const [activeFilters, setActiveFilters] = useState({
    states: [] as string[],
    districts: [] as string[],
    amisps: [] as string[],
  });

  const filterData = (data: AnalyticsData[]) => {
    return data.filter((item) => {
      const stateMatch = activeFilters.states.length === 0 || activeFilters.states.includes(item.state);
      const districtMatch = activeFilters.districts.length === 0 || activeFilters.districts.includes(item.district);
      const amispMatch = activeFilters.amisps.length === 0 || activeFilters.amisps.includes(item.amisp);
      
      return stateMatch && districtMatch && amispMatch;
    });
  };

  const getStats = (data: AnalyticsData[]) => {
    const filteredData = filterData(data);
    
    return {
      totalRevenue: filteredData.reduce((sum, item) => sum + item.revenue, 0),
      totalUsers: filteredData.reduce((sum, item) => sum + item.users, 0),
      avgGrowth: filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.growth, 0) / filteredData.length : 0,
      activeCount: filteredData.filter(item => item.status === 'Active').length,
    };
  };

  const report1Stats = getStats(reportData.report1);
  const report2Stats = getStats(reportData.report2);
  const report3Stats = getStats(reportData.report3);
  const report4Stats = getStats(reportData.report4);

  const filteredData = useMemo(() => ({
    report1: filterData(reportData.report1),
    report2: filterData(reportData.report2),
    report3: filterData(reportData.report3),
    report4: filterData(reportData.report4),
  }), [activeFilters]);

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-analytics-primary rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Comprehensive data insights and reporting</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-card bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
            <CardDescription>
              Apply filters to refine your data across all reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Filters
              filterOptions={filterOptions}
              onFiltersChange={setActiveFilters}
            />
          </CardContent>
        </Card>

        {/* Reports Tabs */}
        <Tabs defaultValue="report1" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white shadow-card">
            <TabsTrigger 
              value="report1" 
              className="data-[state=active]:bg-analytics-primary data-[state=active]:text-white font-medium"
            >
              Report 1
            </TabsTrigger>
            <TabsTrigger 
              value="report2"
              className="data-[state=active]:bg-analytics-primary data-[state=active]:text-white font-medium"
            >
              Report 2
            </TabsTrigger>
            <TabsTrigger 
              value="report3"
              className="data-[state=active]:bg-analytics-primary data-[state=active]:text-white font-medium"
            >
              Report 3
            </TabsTrigger>
            <TabsTrigger 
              value="report4"
              className="data-[state=active]:bg-analytics-primary data-[state=active]:text-white font-medium"
            >
              Report 4
            </TabsTrigger>
          </TabsList>

          {/* Report 1 */}
          <TabsContent value="report1" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('en-IN', { 
                      style: 'currency', 
                      currency: 'INR',
                      maximumFractionDigits: 0 
                    }).format(report1Stats.totalRevenue)}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-analytics-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report1Stats.totalUsers.toLocaleString()}</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-analytics-warning" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${report1Stats.avgGrowth >= 0 ? 'text-analytics-accent' : 'text-analytics-error'}`}>
                    {report1Stats.avgGrowth >= 0 ? '+' : ''}{report1Stats.avgGrowth.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                  <BarChart3 className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report1Stats.activeCount}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Report 1 Data</CardTitle>
                <CardDescription>
                  Detailed analytics data with advanced filtering and export capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData.report1} title="Report 1" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report 2 */}
          <TabsContent value="report2" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('en-IN', { 
                      style: 'currency', 
                      currency: 'INR',
                      maximumFractionDigits: 0 
                    }).format(report2Stats.totalRevenue)}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-analytics-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report2Stats.totalUsers.toLocaleString()}</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-analytics-warning" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${report2Stats.avgGrowth >= 0 ? 'text-analytics-accent' : 'text-analytics-error'}`}>
                    {report2Stats.avgGrowth >= 0 ? '+' : ''}{report2Stats.avgGrowth.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                  <BarChart3 className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report2Stats.activeCount}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Report 2 Data</CardTitle>
                <CardDescription>
                  Detailed analytics data with advanced filtering and export capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData.report2} title="Report 2" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report 3 */}
          <TabsContent value="report3" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('en-IN', { 
                      style: 'currency', 
                      currency: 'INR',
                      maximumFractionDigits: 0 
                    }).format(report3Stats.totalRevenue)}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-analytics-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report3Stats.totalUsers.toLocaleString()}</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-analytics-warning" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${report3Stats.avgGrowth >= 0 ? 'text-analytics-accent' : 'text-analytics-error'}`}>
                    {report3Stats.avgGrowth >= 0 ? '+' : ''}{report3Stats.avgGrowth.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                  <BarChart3 className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report3Stats.activeCount}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Report 3 Data</CardTitle>
                <CardDescription>
                  Detailed analytics data with advanced filtering and export capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData.report3} title="Report 3" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report 4 */}
          <TabsContent value="report4" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('en-IN', { 
                      style: 'currency', 
                      currency: 'INR',
                      maximumFractionDigits: 0 
                    }).format(report4Stats.totalRevenue)}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-analytics-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report4Stats.totalUsers.toLocaleString()}</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-analytics-warning" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${report4Stats.avgGrowth >= 0 ? 'text-analytics-accent' : 'text-analytics-error'}`}>
                    {report4Stats.avgGrowth >= 0 ? '+' : ''}{report4Stats.avgGrowth.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                  <BarChart3 className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report4Stats.activeCount}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Report 4 Data</CardTitle>
                <CardDescription>
                  Detailed analytics data with advanced filtering and export capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData.report4} title="Report 4" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}