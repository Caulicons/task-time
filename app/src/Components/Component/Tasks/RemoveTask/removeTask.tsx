import { ReactComponent as GlassTrash } from '../../../../assets/trash-bin-empty.svg'
const RemoveTask = ({ className, ...props }: React.ComponentProps<'svg'>) => {

  return (
    <GlassTrash className={`
    w-9 h-9 mx-3
    cursor-pointer
    ${className}
    `}
      {...props}
    />
  )
}

export default RemoveTask;