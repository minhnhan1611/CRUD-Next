import { BiCheck } from 'react-icons/bi'

export default function Success({ message }) {
    return (
        <div className="success container mx-auto">
            <div className="flex justify-center mx-auto w-3/6 bg-teal-100 border-t-4 border-teal-500 text-md my-4 text-center rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                {message} <BiCheck size={25} color={"rgb(34,197,94)"}></BiCheck>
            </div>
        </div>
    )
}