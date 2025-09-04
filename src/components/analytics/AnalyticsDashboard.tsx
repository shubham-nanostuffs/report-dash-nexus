import { useState, useMemo } from "react";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/analytics/DataTable";
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
      const stateMatch =
        activeFilters.states.length === 0 ||
        activeFilters.states.includes(item.state);
      const districtMatch =
        activeFilters.districts.length === 0 ||
        activeFilters.districts.includes(item.district);
      const amispMatch =
        activeFilters.amisps.length === 0 ||
        activeFilters.amisps.includes(item.amisp);

      return stateMatch && districtMatch && amispMatch;
    });
  };

  const getStats = (data: AnalyticsData[]) => {
    const filteredData = filterData(data);

    return {
      totalConsumers: filteredData.reduce(
        (sum, item) => sum + item.no_of_consumers,
        0
      ),
      totalResponses: filteredData.reduce(
        (sum, item) => sum + item.consumers_submitted_response,
        0
      ),
      totalMeterIssues: filteredData.reduce(
        (sum, item) => sum + item.issue_faced,
        0
      ),
      totalAppInstalled: filteredData.reduce(
        (sum, item) =>
          sum + (item.consumers_submitted_response - item.not_installed),
        0
      ),
    };
  };

  const getReport1Stats = (data: AnalyticsData[]) => {
    const filteredData = filterData(data);

    return {
      totalConsumers: filteredData.reduce(
        (sum, item) => sum + item.no_of_consumers,
        0
      ),
      totalMessagesAttempted: filteredData.reduce(
        (sum, item) => sum + item.messages_attempted,
        0
      ),
      totalMessagesDelivered: filteredData.reduce(
        (sum, item) => sum + item.messages_delivered,
        0
      ),
      totalMessagesRead: filteredData.reduce(
        (sum, item) => sum + item.messages_read,
        0
      ),
      totalResponses: filteredData.reduce(
        (sum, item) => sum + item.consumers_submitted_response,
        0
      ),
      totalMeterIssues: filteredData.reduce(
        (sum, item) => sum + item.issue_faced,
        0
      ),
      totalAppInstalled: filteredData.reduce(
        (sum, item) =>
          sum + (item.consumers_submitted_response - item.not_installed),
        0
      ),
    };
  };

  const report1Stats = getReport1Stats(reportData.report1);
  const report2Stats = getStats(reportData.report2);
  const report3Stats = getStats(reportData.report3);
  const report4Stats = getStats(reportData.report4);

  const filteredData = useMemo(
    () => ({
      report1: filterData(reportData.report1),
      report2: filterData(reportData.report2),
      report3: filterData(reportData.report3),
      report4: filterData(reportData.report4),
    }),
    [activeFilters]
  );

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
              <h1 className="text-3xl font-bold text-foreground">
                Smart Citizen Survey
              </h1>
              <p className="text-muted-foreground">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="report1" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white shadow-card">
            <TabsTrigger
              value="report1"
              className="data-[state=active]:bg-analytics-primary data-[state=active]:text-white font-medium"
            >
              District Wise Feedback Collection
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
          {/* Report 1 */}
          <TabsContent value="report1" className="space-y-6">
            {/* Stats Cards */}
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Consumers
                  </CardTitle>
                  <Users className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report1Stats.totalConsumers.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Responses
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-analytics-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report1Stats.totalResponses.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Meter Issues
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-analytics-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report1Stats.totalMeterIssues.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    App Installed
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report1Stats.totalAppInstalled.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div> */}

            <Card className="shadow-card bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>District Wise Feedback Collection</CardTitle>
                <CardDescription>
                  Detailed analytics data with advanced filtering and export
                  capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData.report1} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report 2 */}
          <TabsContent value="report2" className="space-y-6">
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Consumers
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report2Stats.totalConsumers.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Responses
                  </CardTitle>
                  <Users className="h-4 w-4 text-analytics-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report2Stats.totalResponses.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Meter Issues
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-analytics-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report2Stats.totalMeterIssues.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    App Installed
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report2Stats.totalAppInstalled.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div> */}

            <Card className="shadow-card bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Report 2 Data</CardTitle>
                <CardDescription>
                  Detailed analytics data with advanced filtering and export
                  capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData.report2} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report 3 */}
          <TabsContent value="report3" className="space-y-6">
            {/* Stats Cards - Commented Out */}
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Consumers
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report3Stats.totalConsumers.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Responses
                  </CardTitle>
                  <Users className="h-4 w-4 text-analytics-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report3Stats.totalResponses.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Meter Issues
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-analytics-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report3Stats.totalMeterIssues.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    App Installed
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report3Stats.totalAppInstalled.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div> */}

            <Card className="shadow-card bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Report 3 Data</CardTitle>
                <CardDescription>
                  Detailed analytics data with advanced filtering and export
                  capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData.report3} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report 4 */}
          <TabsContent value="report4" className="space-y-6">
            {/* Stats Cards - Commented Out */}
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Consumers
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report4Stats.totalConsumers.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Responses
                  </CardTitle>
                  <Users className="h-4 w-4 text-analytics-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report4Stats.totalResponses.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Meter Issues
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-analytics-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report4Stats.totalMeterIssues.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    App Installed
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-analytics-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {report4Stats.totalAppInstalled.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div> */}

            <Card className="shadow-card bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Report 4 Data</CardTitle>
                <CardDescription>
                  Detailed analytics data with advanced filtering and export
                  capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData.report4} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
