import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatPrice } from '@/lib/utils'

type Props = {
  incomes: number | null
  span: { total: number, title: string }
  progress: number
}

const GetIncomes = ({ incomes, span, progress }: Props) => {
  return (
    <Card>
      <CardHeader className='mb-2'>
        <CardDescription>
          {span.title}
        </CardDescription>
        <CardTitle className='text-4xl'>
          {formatPrice(incomes ?? 0)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          of {formatPrice(span.total)} goal
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={progress} /> &nbsp;&nbsp; <span className='text-muted-foreground'>{progress}%</span>
      </CardFooter>
    </Card>
  )
}

export default GetIncomes