'use client'

import { Card } from "shared/components/ui/card"
import { Skeleton } from "shared/components/ui/skeleton"

const CHART_HEIGHTS = [40, 65, 45, 80, 60, 75, 50] // Fixed heights for consistent rendering

export function DashboardOverview() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col gap-1 p-4">
          <h3 className="text-sm font-medium">Total Revenue</h3>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <span className="text-xs text-muted-foreground">+10.1%</span>
          </div>
        </Card>
        <Card className="flex flex-col gap-1 p-4">
          <h3 className="text-sm font-medium">Active Projects</h3>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <span className="text-xs text-muted-foreground">+2.5%</span>
          </div>
        </Card>
        <Card className="flex flex-col gap-1 p-4">
          <h3 className="text-sm font-medium">Team Members</h3>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <span className="text-xs text-muted-foreground">+4.3%</span>
          </div>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <div className="flex h-[400px] flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Project Analytics</h3>
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex-1">
              <div className="grid h-full grid-cols-7 items-end gap-2">
                {CHART_HEIGHTS.map((height, i) => (
                  <div key={i} className="relative">
                    <Skeleton className={`h-[${height}%] w-full rounded-md`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <Card className="col-span-3">
          <div className="flex h-[400px] flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Recent Activity</h3>
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full max-w-[200px]" />
                    <Skeleton className="mt-1 h-3 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
