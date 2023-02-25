import { ReactComponent as RestartIcon } from '../../../../assets/restart.svg'

const ResetTask = ({ className, ...props }: React.ComponentProps<'svg'>) => {

  return (
    <RestartIcon className={`
    w-9 h-9 mx-3
    cursor-pointer
    ${className}
    `} 
    {...props}
    />
  )
}

export default ResetTask;