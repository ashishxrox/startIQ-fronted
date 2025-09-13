import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { useToast } from "../../context/ContextToast";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const InvestorReg = () => {

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
        // Investor Basic Info
        investorName: "",
        contactNumber: "",
        email: "",
        linkedin: "",
        location: "",

        // Investor Type Details
        individualAngelInvestor: "",
        vcFirmRepresentative: "",
        corporateInvestor: "",
        syndicateFundManager: "",

        // Portfolio, Track Record, Engagement Style
        investmentIdeology: "",
        pastInvestments: "",
        notableExits: "",
        workExperience: "",
        engagementStyle: "",
        preferredInvolvement: "",

        // Investor Preferences
        preferredSectors: "",
        ticketSizeRange: "",
        preferredStartupStage: "",
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
            role: "investor",
            data: formData,
        };

        try {
            console.log(payload)
            const res = await fetch(`${API_BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                navigate("/listing-page");
                showToast("Investor Profile created", "success");
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
        <div className="flex flex-col items-center justify-center h-[285vh] w-full relative">
            <Spline
                scene="https://prod.spline.design/QJb4fdFCrDlhnQOz/scene.splinecode"
            />
            <form onSubmit={handleSubmit} className='h-[85%] w-[85%]   absolute mt-[4%] bg-[rgba(255,255,255,0.8)] rounded-[12px] flex justify-center items-start flex-col gap-[15px] px-[40px] py-[40px]'
                style={{ backdropFilter: "blur(5px)", boxShadow: "2px 2px 10px #808080" }}
            >
                <h2 className=" primary-header "
                    style={{ color: "var(--gradient-mid2)", textShadow: "2px 2px 2px #808080" }}
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
                                id="investorName"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.investorName}
                                onChange={handleChange}
                            />
                            <label htmlFor="investorName" className="input-label">
                                Investor's name:
                            </label>
                            {errors.investorName && <p className="text-red-500 text-sm">{errors.investorName}</p>}
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
                            <div className="basis-[30%] input-group">
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
                            <div className="basis-[30%] input-group">
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
                                id="individualAngelInvestor"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.individualAngelInvestor}
                                onChange={handleChange}
                            />
                            <label htmlFor="individualAngelInvestor" className="input-label">
                                Individual Angel Investor:
                            </label>
                            {errors.individualAngelInvestor && <p className="text-red-500 text-sm">{errors.individualAngelInvestor}</p>}
                        </div>
                        <div className="basis-[45%] input-group">
                            <input
                                type="text"
                                id="vcFirmRepresentative"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.vcFirmRepresentative}
                                onChange={handleChange}
                            />
                            <label htmlFor="vcFirmRepresentative" className="input-label">
                                VC Firm Representative:
                            </label>
                            {errors.vcFirmRepresentative && <p className="text-red-500 text-sm">{errors.vcFirmRepresentative}</p>}
                        </div>
                    </div>
                    <div className='basis-[40%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>

                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="corporateInvestor"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.corporateInvestor}
                                    onChange={handleChange}
                                />
                                <label htmlFor="corporateInvestor" className="input-label">
                                    Corporate / Strategic Investor:
                                </label>
                                {errors.corporateInvestor && <p className="text-red-500 text-sm">{errors.corporateInvestor}</p>}
                            </div>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="syndicateFundManager"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.syndicateFundManager}
                                    onChange={handleChange}
                                />
                                <label htmlFor="syndicateFundManager" className="input-label">
                                    Syndicate / Fund Manager:
                                </label>
                                {errors.syndicateFundManager && <p className="text-red-500 text-sm">{errors.syndicateFundManager}</p>}
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
                            <label for="investmentIdeology" class="textarea-label">Investment Ideology </label>
                            <textarea id="investmentIdeology" class="modern-textarea" placeholder="Tell us more..."
                                value={formData.investmentIdeology}
                                onChange={handleChange}
                            ></textarea>
                            {errors.investmentIdeology && <p className="text-red-500 text-sm">{errors.investmentIdeology}</p>}

                        </div>
                    </div>
                    <div className='basis-[5%]   h-[90%] w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="pastInvestments" class="textarea-label">Past investments (startup names, short blurbs)</label>
                            <textarea id="pastInvestments" class="modern-textarea" placeholder="Tell us more..."
                                value={formData.pastInvestments}
                                onChange={handleChange}
                            ></textarea>
                            {errors.pastInvestments && <p className="text-red-500 text-sm">{errors.pastInvestments}</p>}
                        </div>
                    </div>

                    <div className='basis-[25%]   h-full w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="notableExits" class="textarea-label">Notable exits / success stories</label>
                            <textarea id="notableExits" class="modern-textarea" placeholder="Tell us more..."
                                value={formData.notableExits}
                                onChange={handleChange}
                            ></textarea>
                            {errors.notableExits && <p className="text-red-500 text-sm">{errors.notableExits}</p>}
                        </div>
                    </div>

                    <div className='basis-[25%]   h-full w-full flex justify-between items-center flex-row py-[15px]'>
                        <div class="textarea-container h-full">
                            <label for="workExperience" class="textarea-label">Work Experience</label>
                            <textarea id="workExperience" class="modern-textarea" placeholder="Tell us more..."
                                value={formData.workExperience}
                                onChange={handleChange}
                            ></textarea>
                            {errors.workExperience && <p className="text-red-500 text-sm">{errors.workExperience}</p>}
                        </div>
                    </div>

                    <div className='basis-[20%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="engagementStyle"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.engagementStyle}
                                    onChange={handleChange}
                                />
                                <label htmlFor="engagementStyle" className="input-label">
                                    Engagement Style:
                                </label>
                                {errors.engagementStyle && <p className="text-red-500 text-sm">{errors.engagementStyle}</p>}
                            </div>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="preferredInvolvement"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.preferredInvolvement}
                                    onChange={handleChange}
                                />
                                <label htmlFor="preferredInvolvement" className="input-label">
                                    Preferred involvement:
                                </label>
                                {errors.preferredInvolvement && <p className="text-red-500 text-sm">{errors.preferredInvolvement}</p>}
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
                                id="preferredSectors"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.preferredSectors}
                                onChange={handleChange}
                            />
                            <label htmlFor="preferredSectors" className="input-label">
                                Preferred Sectors / Industries :
                            </label>
                            {errors.preferredSectors && <p className="text-red-500 text-sm">{errors.preferredSectors}</p>}
                        </div>
                        <div className="basis-[45%] input-group">
                            <input
                                type="text"
                                id="ticketSizeRange"
                                className="input-field"
                                required
                                placeholder=" " // Needed for floating label trick
                                value={formData.ticketSizeRange}
                                onChange={handleChange}
                            />
                            <label htmlFor="ticketSizeRange" className="input-label">
                                Ticket Size Range:
                            </label>
                            {errors.ticketSizeRange && <p className="text-red-500 text-sm">{errors.ticketSizeRange}</p>}
                        </div>
                    </div>
                    <div className='basis-[40%] h-full w-full'>
                        <div className='flex justify-between items-center flex-row'>
                            <div className="basis-[45%] input-group">
                                <input
                                    type="text"
                                    id="preferredStartupStage"
                                    className="input-field"
                                    required
                                    placeholder=" " // Needed for floating label trick
                                    value={formData.preferredStartupStage}
                                onChange={handleChange}
                                />
                                <label htmlFor="preferredStartupStage" className="input-label">
                                    Preferred Startup Stage:
                                </label>
                                {errors.preferredStartupStage && <p className="text-red-500 text-sm">{errors.preferredStartupStage}</p>}
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

export default InvestorReg
