import StatusDropdown from '@/components/custom/StatusDropdown'
import GetIncomes from '@/components/reutilizable/GetIncomes'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { db } from '@/db'
import { formatPrice } from '@/lib/utils'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound } from 'next/navigation'


const Dashboard = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  if (!user || user.email !== ADMIN_EMAIL) return notFound()
  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)) // retrieve orders within last 7 days
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: true,
      ShippingAddress: true,
    }
  })
  const lastWeekIncomes = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)) // retrieve orders within last 7 days
      }
    },
    _sum: {
      amount: true
    }
  })

  const lastMonthIncomes = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)) // retrieve orders within last 7 days
      }
    },
    _sum: {
      amount: true
    }
  })

  const WEEKLY_GOAL = {
    total: 500,
    title: "Last Week"
  }
  const MONTHLY_GOAL = {
    total: 2000,
    title: "Last Month"
  }

  const PROGRESS_WEEK = ((lastWeekIncomes._sum.amount ?? 0) * 100) / WEEKLY_GOAL.total
  const PROGRESS_MONTH = ((lastMonthIncomes._sum.amount ?? 0) * 100) / MONTHLY_GOAL.total
  //console.log(PROGRESS);
  return (
    <div className='flex min-h-screen w-full bg-muted/40 px-4'>
      <div className='max-w-7xl w-full mx-auto flex flex-col sm:gap-4 py-4'>
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <GetIncomes span={WEEKLY_GOAL} progress={PROGRESS_WEEK} incomes={lastWeekIncomes._sum.amount} />
            <GetIncomes span={MONTHLY_GOAL} progress={PROGRESS_MONTH} incomes={lastMonthIncomes._sum.amount} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className='hidden sm:table-cell'>Status</TableHead>
                <TableHead className='hidden sm:table-cell'>Purchase date</TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orders.map((order) => (
                  <TableRow key={order.id} className='bg-accent'>
                    <TableCell >
                      <div className='font-medium'>
                        {order.ShippingAddress?.name}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {order.user.email}
                      </div>
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      <StatusDropdown id={order.id} orderStatus={order.status} />
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {order.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right'>
                      {formatPrice(order.amount)}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
