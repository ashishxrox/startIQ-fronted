import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { useToast } from "../../context/ContextToast";

const Registration = () => {

    // 🔒 Protect Route
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const localId = sessionStorage.getItem("localId");

        if (!localId) {
            showToast("Invalid Access", "error");
            navigate("/auth");
        } else {
            setUid(localId);
        }
    }, [navigate]);

    const initialFormData = {
        startupName: "",
        industry: "",
        location: "",
        website: "",
        founderName: "",
        contactNumber: "",
        email: "",
        linkedin: "",
        pitch: "",
        problem: "",
        solution: "",
        stage: "",
        yearFounded: "",
        customerCount: "",
        revenue: "",
        milestones: "",
        growthRate: "",
        fundingStage: "",
        totalRaised: "",
        fundingSought: "",
    };

    const [formData, setFormData] = useState(initialFormData);



    const [errors, setErrors] = useState({});


    // handle input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // validate required fields
    const validateForm = () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = "This field is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            uid,
            role: "founder",
            data: formData,
        };

        try {
            console.log(payload)
            const res = await fetch("http://localhost:5002/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                showToast("Startup Profile created", "success");
                navigate("/dashboard/startup");
                setFormData({});
            } else {
                showToast("Profile creation failed", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Profile creation failed", "error");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-[265vh] w-full relative">
            <Spline
                scene="https://prod.spline.design/QJb4fdFCrDlhnQOz/scene.splinecode"
            />
            <form onSubmit={handleSubmit} className='h-[85%] w-[85%]   absolute mt-[4%] bg-[rgba(255,255,255,0.8)] rounded-[12px] flex justify-center items-start flex-col gap-[15px] px-[40px] py-[40px]'
                style={{ backdropFilter: "blur(5px)", boxShadow: "2px 2px 10px #808080" }}
            >
                <h2 className=" primary-header "
                    style={{ color: "var(--gradient-end)", textShadow: "2px 2px 2px #808080" }}
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
                                id="startupName"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.startupName}
                                onChange={handleChange}
                            />
                            <label htmlFor="startupName" className="input-label">
                                Start up name:
                            </label>
                            {errors.startupName && <p className="text-red-500 text-sm">{errors.startupName}</p>}
                        </div>
                    </div>
                    <div className='basis-[40%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="industry"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.industry}
                                    onChange={handleChange}
                                />
                                <label htmlFor="industry" className="input-label">
                                    Industry/Sector Type:
                                </label>
                                {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
                            </div>
                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="location"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                                <label htmlFor="location" className="input-label">
                                    Location:
                                </label>
                                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                            </div>
                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="website"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                                <label htmlFor="website" className="input-label">
                                    Website / Social Links:
                                </label>
                                {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
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
                                id="founderName"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.founderName}
                                onChange={handleChange}
                            />
                            <label htmlFor="founderName" className="input-label">
                                Founder's name:
                            </label>
                            {errors.founderName && <p className="text-red-500 text-sm">{errors.founderName}</p>}
                        </div>

                        <div className="basis-[30%] input-group">
                            <input
                                type="text"
                                id="contactNumber"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.contactNumber}
                                onChange={handleChange}
                            />
                            <label htmlFor="contactNumber" className="input-label">
                                Contact number:
                            </label>
                            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
                        </div>
                    </div>
                    <div className='basis-[40%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="email"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email" className="input-label">
                                    Email:
                                </label>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="linkedin"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                />
                                <label htmlFor="linkedin" className="input-label">
                                    LinkedIn:
                                </label>
                                {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin}</p>}
                            </div>


                        </div>
                    </div>



                </div>
                <div className='startup-overview-info h-[600px] w-[95%] flex justify-between items-start flex-col'>
                    <h3 className=" tertiary-header">
                        Startup overview
                    </h3>
                    <div className='basis-[5%]   h-[90%] w-full flex justify-between items-center flex-row py-[15px]'>
                        <div className="textarea-container h-full">
                            <label htmlFor="pitch" className="textarea-label"
                            >One-liner pitch</label>
                            <textarea id="pitch" className="modern-textarea" placeholder="in 140 chars..."
                                value={formData.pitch}
                                onChange={handleChange}
                            ></textarea>
                            {errors.pitch && <p className="text-red-500 text-sm">{errors.pitch}</p>}
                        </div>
                    </div>

                    <div className='basis-[25%]   h-full w-full flex justify-between items-center flex-row py-[15px]'>
                        <div className="textarea-container h-full">
                            <label htmlFor="problem" className="textarea-label">Problem statement</label>
                            <textarea id="problem" className="modern-textarea" placeholder="What do you solve?"
                                value={formData.problem}
                                onChange={handleChange}
                            ></textarea>
                            {errors.problem && <p className="text-red-500 text-sm">{errors.problem}</p>}
                        </div>
                    </div>

                    <div className='basis-[25%]   h-full w-full flex justify-between items-center flex-row py-[15px]'>
                        <div className="textarea-container h-full">
                            <label htmlFor="solution" className="textarea-label">Solution</label>
                            <textarea id="solution" className="modern-textarea" placeholder="how do you solve it?"
                                value={formData.solution}
                                onChange={handleChange}
                            ></textarea>
                            {errors.solution && <p className="text-red-500 text-sm">{errors.solution}</p>}
                        </div>
                    </div>

                    <div className='basis-[20%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="stage"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.stage}
                                    onChange={handleChange}
                                />
                                <label htmlFor="stage" className="input-label">
                                    Current Stage(idea, MVP, revenue, scaling):
                                </label>
                                {errors.stage && <p className="text-red-500 text-sm">{errors.stage}</p>}
                            </div>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="yearFounded"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.yearFounded}
                                    onChange={handleChange}
                                />
                                <label htmlFor="yearFounded" className="input-label">
                                    Year founded:
                                </label>
                                {errors.yearFounded && <p className="text-red-500 text-sm">{errors.yearFounded}</p>}
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
                                id="customerCount"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.customerCount}
                                onChange={handleChange}
                            />
                            <label htmlFor="customerCount" className="input-label">
                                Customer Count (If any):
                            </label>
                            {errors.customerCount && <p className="text-red-500 text-sm">{errors.customerCount}</p>}
                        </div>
                        <div className="basis-[45%] input-group">
                            <input
                                type="text"
                                id="revenue"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.revenue}
                                onChange={handleChange}
                            />
                            <label htmlFor="revenue" className="input-label">
                                Monthly/Annual Revenue:
                            </label>
                            {errors.revenue && <p className="text-red-500 text-sm">{errors.revenue}</p>}
                        </div>
                    </div>
                    <div className='basis-[40%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[65%] input-group">
                                <input
                                    type="text"
                                    id="milestones"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.milestones}
                                    onChange={handleChange}
                                />
                                <label htmlFor="milestones" className="input-label">
                                    Key milestones:
                                </label>
                                {errors.milestones && <p className="text-red-500 text-sm">{errors.milestones}</p>}
                            </div>
                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="growthRate"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.growthRate}
                                    onChange={handleChange}
                                />
                                <label htmlFor="growthRate" className="input-label">
                                    Growth rate (if known):
                                </label>
                                {errors.growthRate && <p className="text-red-500 text-sm">{errors.growthRate}</p>}
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
                                    id="fundingStage"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.fundingStage}
                                    onChange={handleChange}
                                />
                                <label htmlFor="fundingStage" className="input-label">
                                    Funding stage:
                                </label>
                                {errors.fundingStage && <p className="text-red-500 text-sm">{errors.fundingStage}</p>}
                            </div>
                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="totalRaised"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.totalRaised}
                                    onChange={handleChange}
                                />
                                <label htmlFor="totalRaised" className="input-label">
                                    Total raised so far (if any):
                                </label>
                                {errors.totalRaised && <p className="text-red-500 text-sm">{errors.totalRaised}</p>}
                            </div>


                            <div className="basis-[30%] input-group">
                                <input
                                    type="text"
                                    id="fundingSought"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.fundingSought}
                                    onChange={handleChange}
                                />
                                <label htmlFor="fundingSought" className="input-label">
                                    Funding sought (amount looking for):
                                </label>
                                {errors.fundingSought && <p className="text-red-500 text-sm">{errors.fundingSought}</p>}
                            </div>


                        </div>
                    </div>



                </div>
                <div className='h-[100px] w-full flex justify-start items-center'>
                    <button className='btn btn-primary' type="submit">Submit</button>
                </div>
            </form>

        </div>
    )
}

export default Registration




// UID =     uOwqArHC60dRkOj7fEKlRhOUIxG3
// LocalID = uOwqArHC60dRkOj7fEKlRhOUIxG3
//           uOwqArHC60dRkOj7fEKlRhOUIxG3