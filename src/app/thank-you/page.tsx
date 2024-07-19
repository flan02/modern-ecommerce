import Thankyou from '@/components/custom/Thankyou'
import { Suspense } from 'react'

type Props = {}

const ThankyouPage = (props: Props) => {
  // * Suspense lets you display a fallback until its children have finished loading
  return (
    <Suspense>
      <Thankyou />
    </Suspense>
  )
}

export default ThankyouPage