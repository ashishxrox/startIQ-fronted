import React from 'react'
import Spline from '@splinetool/react-spline';

const Registration = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[265vh] w-full relative">
            <Spline
                scene="https://prod.spline.design/QJb4fdFCrDlhnQOz/scene.splinecode"
            />
            <div className='h-[85%] w-[85%]   absolute mt-[4%] bg-[rgba(255,255,255,0.8)] rounded-[12px] flex justify-center items-start flex-col gap-[15px] px-[40px] py-[40px]'
                style={{ backdropFilter: "blur(5px)", boxShadow: "2px 2px 10px #808080" }}
            >
                <h2 className=" primary-header "
                    style={{color: "var(--gradient-end)", textShadow:"2px 2px 2px #808080"}}
                >
                    New start up Registration
                </h2>
                <div className='startup-basic-info h-[250px] w-[95%] flex justify-between items-start  flex-col'>
                    <h3 className=" tertiary-header">
                        Basic Details
                    </h3>
                    <div className='basis-[40%]   h-full w-full flex justify-between items-center flex-row'>
                        <div className="basis-[50%] input-group">
                            <input
                                type="text"
                                id="name"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                            />
                            <label htmlFor="name" className="input-label">
                                Start up name:
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
                                    Industry/Sector Type:
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
                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    Website / Social Links:
                                </label>
                            </div>

                        </div>
                    </div>



                </div>
                <div className='founder-basic-info h-[250px] w-[95%] flex justify-between items-start flex-col'>
                    <h3 className=" tertiary-header">
                        Founder Details
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
                                Founder's name:
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
                            <div className="basis-[45%] input-group">
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
                            <div className="basis-[45%] input-group">
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
                            

                        </div>
                    </div>



                </div>
                <div className='startup-overview-info h-[600px] w-[95%] flex justify-between items-start flex-col'>
                    <h3 className=" tertiary-header">
                        Startup overview
                    </h3>
                    <div className='basis-[5%]   h-[90%] w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="message" class="textarea-label">One-liner pitch</label>
                            <textarea id="message" class="modern-textarea" placeholder="in 140 chars..."></textarea>
                        </div>
                    </div>

                    <div className='basis-[25%]   h-full w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="message" class="textarea-label">Problem statement</label>
                            <textarea id="message" class="modern-textarea" placeholder="What do you solve?"></textarea>
                        </div>
                    </div>

                    <div className='basis-[25%]   h-full w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="message" class="textarea-label">Solution</label>
                            <textarea id="message" class="modern-textarea" placeholder="how do you solve it?"></textarea>
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
                                    Current Stage(idea, MVP, revenue, scaling):
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
                                    Year founded:
                                </label>
                            </div>
                        </div>
                    </div>

                    
                    



                </div>
                <div className='traction-metric-info h-[250px] w-[95%] flex justify-between items-start  flex-col'>
                    <h3 className=" tertiary-header">
                        Traction and Metrics
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
                                Customer Count (If any):
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
                                Monthly/Annual Revenue:
                            </label>
                        </div>
                    </div>
                    <div className='basis-[40%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[65%] input-group">
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                />
                                <label htmlFor="name" className="input-label">
                                    Key milestones:
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
                                    Growth rate (if known):
                                </label>
                            </div>

                        </div>
                    </div>



                </div>
                <div className='funding-info h-[150px] w-[95%] flex justify-between items-start flex-col'>
                    <h3 className=" tertiary-header">
                        Funding Information
                    </h3>
                    <div className=' h-full w-full'>
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
                                    Funding stage:
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
                                    Total raised so far (if any):
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
                                    Funding sought (amount looking for):
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

export default Registration
