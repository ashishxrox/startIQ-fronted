import React from "react";
import { Globe, MapPin, Linkedin, User, Mail, Phone, Briefcase } from "lucide-react";

const StartupDetailsCard = ({ data }) => {
  if (!data) {
    return (
      <div className="text-gray-500 text-sm italic">No startup data available.</div>
    );
  }

  const {
    name,
    logo,
    industry,
    location,
    website,
    founders,
    overview,
  } = data;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-6">
      {/* Title */}
      <h3 className="text-xl font-semibold bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid1)] via-[var(--gradient-mid2)] to-[var(--gradient-end)] bg-clip-text text-transparent">
        Startup Details
      </h3>

      {/* Section 1: Basic Details */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <Briefcase size={18} className="text-gray-500" /> Basic Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium">Startup Name</p>
            <p>{name}</p>
          </div>
          {logo && (
            <div>
              <p className="font-medium">Logo / Branding</p>
              <img src={logo} alt="Startup Logo" className="h-10 mt-1 rounded" />
            </div>
          )}
          <div>
            <p className="font-medium">Industry / Sector</p>
            <p>{industry}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />
            <p>{location}</p>
          </div>
          {website && (
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-gray-500" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Founder Details */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <User size={18} className="text-gray-500" /> Founder Details
        </h4>
        <div className="space-y-4">
          {founders?.map((founder, i) => (
            <div
              key={i}
              className="p-3 rounded-xl border border-gray-100 bg-gray-50"
            >
              <p className="font-medium text-gray-800">{founder.name}</p>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                {founder.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={14} /> Hidden
                  </span>
                )}
                {founder.contact && (
                  <span className="flex items-center gap-1">
                    <Phone size={14} /> Hidden
                  </span>
                )}
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </a>
                )}
              </div>
              {founder.bio && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  {founder.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Startup Overview */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-gray-800">Startup Overview</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium">One-liner Pitch</p>
            <p>{overview?.pitch}</p>
          </div>
          <div>
            <p className="font-medium">Problem Statement</p>
            <p>{overview?.problem}</p>
          </div>
          <div>
            <p className="font-medium">Solution</p>
            <p>{overview?.solution}</p>
          </div>
          <div>
            <p className="font-medium">Current Stage</p>
            <p>{overview?.stage}</p>
          </div>
          <div>
            <p className="font-medium">Year Founded</p>
            <p>{overview?.founded}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetailsCard;
