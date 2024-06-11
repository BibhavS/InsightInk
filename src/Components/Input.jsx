import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref){
    const id = useId();
    return (
        <div className='w-full'>
            {label && 
            <label className='inline-block mb-1 pl-1' htmlFor={id}>
              {label}
            </label>}
            <input 
            type={type}
            className={`w-full px-2 py-3 outline-none border-2 rounded-lg ${className}`}
            ref={ref}
            {...props}
            id={id}/>
        </div>
    )
})


export default Input

