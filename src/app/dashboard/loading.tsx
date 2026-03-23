import { Card, CardContent } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-slate-200 rounded mb-2"></div>
        <div className="h-4 w-96 bg-slate-200 rounded"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="h-[300px] flex items-center justify-center pt-6">
            <div className="h-48 w-full bg-slate-100 rounded"></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="h-[300px] flex items-center justify-center pt-6">
            <div className="h-48 w-full bg-slate-100 rounded"></div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="h-[200px] flex items-center justify-center pt-6">
          <div className="h-full w-full bg-slate-100 rounded"></div>
        </CardContent>
      </Card>
    </div>
  )
}
