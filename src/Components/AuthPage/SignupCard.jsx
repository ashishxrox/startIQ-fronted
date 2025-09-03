import React from 'react'

const SignupCard = () => {
    return (
        <div className='h-full w-full  flex justify-center items-center flex-col gap-[35px]'>
            <h3 className='secondary-header'>Sign in</h3>
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
                        Email
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
                <button className='btn btn-primary'>Sign in</button>
            </div>
        </div>

    )
}

export default SignupCard
