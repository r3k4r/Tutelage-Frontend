import DashboardOverview from '@/components/pages/admin/dashboard/DashboardOverview';
import DashboardUsersTable from '@/components/pages/admin/dashboard/DashboardUsersTable';
import AnalyticsChart from '@/components/pages/admin/dashboard/AnalyticsChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Suspense } from 'react';
import ListingPageHeader from '@/components/layouts/admin/ListingPageHeader'

const Page = () => {
  return (
    <div className="space-y-4">
      <ListingPageHeader title="Dashboard Overview" />
      
      <DashboardOverview />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Analytics Chart */}
        <Suspense fallback={null}>
          <AnalyticsChart />
        </Suspense>

        {/* Right table - Users */}
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage and track your users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardUsersTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page