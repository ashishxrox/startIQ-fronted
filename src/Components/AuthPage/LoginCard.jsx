import React from 'react'

const LoginCard = () => {
    return (
        <div className='h-full w-full  flex justify-center items-center flex-col gap-[35px]'>
            <h3 className='secondary-header'>Login</h3>
            <div className='h-[60%] w-[65%] flex justify-start flex-col items-center gap-[30px]'>
                <div className="input-group">
                    <input
                        type="text"
                        id="name"
                        className="input-field"
                        required
                        placeholder=" " // Needed for floating label trick
                    />
                    <label htmlFor="name" className="input-label">
                        Username
                    </label>
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        id="name"
                        className="input-field"
                        required
                        placeholder=" " // Needed for floating label trick
                    />
                    <label htmlFor="name" className="input-label">
                        Password
                    </label>
                </div>
                <div className='w-full h-[30px]'>
                    <p className='paragraph cursor-pointer hover:text-[#FFD500] w-[35%] '>Forgot your password</p>
                </div>
                <button className='btn btn-primary'>Login</button>
            </div>
        </div>
    )
}

export default LoginCard
