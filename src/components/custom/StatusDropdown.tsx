"use client"
import { OrderStatus } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { changeOrderStatus } from "@/app/dashboard/actions"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"


type Props = {
  id: string
  orderStatus: OrderStatus
}

const StatusDropdown = ({ id, orderStatus }: Props) => {
  const router = useRouter()
  const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    awaiting_shipment: 'Awaiting Shipment',
    fulfilled: 'Fulfilled',
    shipped: 'Shipped',
  }

  const { mutate: newStatus } = useMutation({
    mutationKey: ['change-order-status'],
    mutationFn: changeOrderStatus,
    onSuccess: () => {
      router.refresh()
      toast({
        title: 'Order status updated',
        description: 'The order status has been updated successfully',
      })
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: 'The status was not updated',
        description: 'An error occurred while updating the order status',
      })
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-52 flex justify-between items-center">
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn("flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
              { "bg-zinc-100": orderStatus === status }
            )}
            onClick={() => newStatus({ id, newOrderStatus: status as OrderStatus })}
          >
            <Check className={cn("mr-2 size-4 text-primary",
              orderStatus === status ? "opacity-100" : "opacity-0"
            )}
            />
            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusDropdown