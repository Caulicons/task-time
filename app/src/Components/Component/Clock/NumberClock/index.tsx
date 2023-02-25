type numberClockProps = {
  number?: string
}

const NumberClock = ({number}: numberClockProps) => {

  return (
    <span className='
      w-3/12 text-[px] p-3 h-[180px] bg-slate-900 rounded-md text-colorText 
      text-9xl flex justify-center align-center border-r-sky-300
      '>{number ?? 0}</span>
  )
}

export default NumberClock;