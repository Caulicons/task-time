type boxInput = React.ComponentProps<'div'>

const Box = ({className, ...props}: boxInput) => {
  return (
    <div className={`
    ${className}
    rounded-lg
    min-h-fit
    `}>
      {props.children}
    </div>
  )
}

export default Box;