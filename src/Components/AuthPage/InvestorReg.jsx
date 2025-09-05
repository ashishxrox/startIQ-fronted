import React from 'react'
import Spline from '@splinetool/react-spline';


const InvestorReg = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[285vh] w-full relative">
            <Spline
                scene="https://prod.spline.design/QJb4fdFCrDlhnQOz/scene.splinecode"
            />
            <div className='h-[85%] w-[85%]   absolute mt-[4%] bg-[rgba(255,255,255,0.8)] rounded-[12px] flex justify-center items-start flex-col gap-[15px] px-[40px] py-[40px]'
                style={{ backdropFilter: "blur(5px)", boxShadow: "2px 2px 10px #808080" }}
            >
                <h2 className=" primary-header "
                    style={{color: "var(--gradient-mid2)", textShadow:"2px 2px 2px #808080"}}
                >
                    New investor Registration
                </h2>
                <div className='investor-basic-info h-[250px] w-[95%] flex justify-between items-start flex-col'>
                    <h3 className=" tertiary-header">
                        Investor Details
                    </h3>
                    <div className='basis-[40%]   h-full w-full flex justify-between items-center flex-row'>
                        <div className="basis-[65%] input-group">
                            <input
                                type="text"
                                id="name"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                            />
                            <label htmlFor="name" className="input-label">
                                Investor's name:
                            </label>
                        </div>

                        <div className="basis-[30%] input-group">
                            <input
                                type="text"
                                id="name"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                            />
                            <label htmlFor="name" className="input-label">
                                Contact number:
                            </label>
                        </div>
                    </div>
                    <div className='basis-[40%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    Email:
                                </label>
                            </div>
                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    LinkedIn:
                                </label>
                            </div>

                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    Location:
                                </label>
                            </div>


                        </div>
                    </div>



                </div>

                <div className='investor-type-info h-[250px] w-[95%] flex justify-between items-start  flex-col'>
                    <h3 className=" tertiary-header">
                        Investor Type Details
                    </h3>
                    <div className='basis-[40%]   h-full w-full flex justify-between items-center flex-row'>
                        <div className="basis-[45%] input-group">
                            <input
                                type="text"
                                id="name"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                            />
                            <label htmlFor="name" className="input-label">
                                Individual Angel Investor:
                            </label>
                        </div>
                        <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    VC Firm Representative:
                                </label>
                            </div>
                    </div>
                    <div className='basis-[40%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    Corporate / Strategic Investor:
                                </label>
                            </div>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    Syndicate / Fund Manager:
                                </label>
                            </div>

                        </div>
                    </div>



                </div>

                <div className='investor-portfolio-info h-[800px] w-[95%] flex justify-between items-start flex-col'>
                    <h3 className=" tertiary-header">
                        Portfolio, Track Record and Engagement Style
                    </h3>
                    <div className='basis-[25%]   h-full w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="message" class="textarea-label">Investment Ideology </label>
                            <textarea id="message" class="modern-textarea" placeholder="Tell us more..."></textarea>
                        </div>
                    </div>
                    <div className='basis-[5%]   h-[90%] w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="message" class="textarea-label">Past investments (startup names, short blurbs)</label>
                            <textarea id="message" class="modern-textarea" placeholder="Tell us more..."></textarea>
                        </div>
                    </div>

                    <div className='basis-[25%]   h-full w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="message" class="textarea-label">Notable exits / success stories</label>
                            <textarea id="message" class="modern-textarea" placeholder="Tell us more..."></textarea>
                        </div>
                    </div>

                    <div className='basis-[25%]   h-full w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="message" class="textarea-label">Work Experience</label>
                            <textarea id="message" class="modern-textarea" placeholder="Tell us more..."></textarea>
                        </div>
                    </div>

                    <div className='basis-[20%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    Engagement Style:
                                </label>
                            </div>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    Preferred involvement:
                                </label>
                            </div>
                        </div>
                    </div>






                </div>
                <div className='investor-pref-info h-[250px] w-[95%] flex justify-between items-start  flex-col'>
                    <h3 className=" tertiary-header">
                        Investor Preferences
                    </h3>
                    <div className='basis-[40%]   h-full w-full flex justify-between items-center flex-row'>
                        <div className="basis-[45%] input-group">
                            <input
                                type="text"
                                id="name"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                            />
                            <label htmlFor="name" className="input-label">
                                Preferred Sectors / Industries :
                            </label>
                        </div>
                        <div className="basis-[45%] input-group">
                            <input
                                type="text"
                                id="name"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                            />
                            <label htmlFor="name" className="input-label">
                                Ticket Size Range:
                            </label>
                        </div>
                    </div>
                    <div className='basis-[40%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    Preferred Startup Stage:
                                </label>
                            </div>

                        </div>
                    </div>



                </div>
                <div className='h-[100px] w-full flex justify-start items-center'>
                    <button className='btn btn-primary'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default InvestorReg
