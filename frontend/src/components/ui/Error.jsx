import { useNavigate } from 'react-router'
import { useRouteError } from 'react-router'

const Error = () => {
    const error = useRouteError()
    const navigate = useNavigate()

  return (
     <div className='min-h-dvh flex flex-col justify-center items-center text-3xl'>
        <h1 className='text-center mb-4'>An error occurred</h1>
        <p>{error.message}</p>
        <button onClick={() => navigate('/dashboard')} className='bg-blue-500 hover:bg-blue-700 rounded-sm text-white px-4 py-2 text-sm cursor-pointer'>Go to homepage</button>
    </div>
  )
}

export default Error