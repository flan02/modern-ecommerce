

type Props = {}
// ? This component is used in each border of the DesignConfigurator component to render the resize handles for the image
const ResizeHandleComponent = (props: Props) => {
  return (
    <div className="w-5 h-5 rounded-full shadow border bg-white border-zinc-200 transition hover:bg-primary" />
  )
}

export default ResizeHandleComponent