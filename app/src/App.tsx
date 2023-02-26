import Text from './Components/Basic/Text';
import Clock from './Components/Component/Clock';
import Form from './Components/Component/Form';
import Tasks from './Components/Component/Tasks';

function App() {

  return (

    <main className='bg-slate-900 h-screen w-screen flex justify-center overflow-x-hidden'>
      <article className="max-w-[1280px] min-w-[1024px] max-h-[860px] flex-col   ">
        <Text type='h1' className='text-colorText grid justify-center my-12 text-4xl'>Task Timer 📌</Text>
        <div className='flex content-center justify-center'>
          <div className='w-8/12 h-full flex flex-col items-center '>
            <Form></Form>
            <Clock></Clock>
          </div>
          <Tasks></Tasks>
        </div>
      </article>
    </main >
  )
}

export default App
