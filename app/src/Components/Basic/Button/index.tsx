type InputButton = React.ComponentProps<'button'>

const Button = ({ children, className, ...props }: InputButton) => {

  return (
    <button
      {...props}
      className={`
    justify-self-center py-2 px-4 rounded-xl bg-gray-800 text-xl text-colorText h-14 
    hover:border-2 hover:border-indigo-400 
    active:bg-indigo-300 active:text-black active:ease-out active:duration-500 
    active:transition-colors
    w-full
    min-w-[120px]
    ${className}
    `}
    >
      {children}
    </button>
  )
}

export default Button;