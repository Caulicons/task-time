type InputProps = React.ComponentProps<'input'>

const Input = (props: InputProps) => {

  return (
    <input
      {...props}
      className={`
    bg-slate-900
    p-3
    rounded-lg
    text-colorText
    h-12
    ${props.className}
    ` }

    >
    </input>
  )
}

export default Input;