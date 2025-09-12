import React, { useState } from "react";
import {
  Globe,
  MapPin,
  Linkedin,
  User,
  Mail,
  Phone,
  Briefcase,
  Pencil,
  Save,
  Edit3,
  X,
} from "lucide-react";

const StartupDetailsCard = ({ data, role
 }) => {
  const [editMode, setEditMode] = useState(false);

  if (!data) {
    return (
      <div className="text-gray-500 text-sm italic">No startup data available.</div>
    );
  }

  const { name, logo, industry, location, website, founders, overview } = data;

  const handleChange = (section, field, value, index = null) => {
    setFormData((prev) => {
      if (section === "founders") {
        const updated = [...prev.founders];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, founders: updated };
      }
      if (section === "overview") {
        return { ...prev, overview: { ...prev.overview, [field]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setFormData(data); // reset changes when entering edit mode
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-6 relative">
      {/* Edit Button */}
      {role == "founder" && <div className="absolute top-6 right-6 flex gap-2">
        {editMode ? (
          <>
            <button
              onClick={() => setEditMode(false)}
              className="flex items-center gap-1 px-3 py-1 text-sm cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <X size={14} /> Cancel
            </button>
            <button
              onClick={() => setEditMode(false)} // save can be handled externally
              className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
            >
              <Save size={14} /> Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <Edit3 size={14} /> Edit
          </button>
        )}
      </div>}

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
            <p>{name}</p> {/* name cannot be edited */}
          </div>
          {logo && (
            <div>
              <p className="font-medium">Logo / Branding</p>
              {editMode ? (
                <input
                  type="text"
                  value={logo}
                  onChange={(e) => handleChange("basic", "logo", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              ) : (
                <img src={logo} alt="Startup Logo" className="h-10 mt-1 rounded" />
              )}
            </div>
          )}
          <div>
            <p className="font-medium">Industry / Sector</p>
            {editMode ? (
              <input
                type="text"
                value={industry}
                onChange={(e) =>
                  handleChange("basic", "industry", e.target.value)
                }
                className="w-full border rounded px-2 py-1 text-sm"
              />
            ) : (
              <p>{industry}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />
            {editMode ? (
              <input
                type="text"
                value={location}
                onChange={(e) =>
                  handleChange("basic", "location", e.target.value)
                }
                className="w-full border rounded px-2 py-1 text-sm"
              />
            ) : (
              <p>{location}</p>
            )}
          </div>
          {website && (
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-gray-500" />
              {editMode ? (
                <input
                  type="text"
                  value={website}
                  onChange={(e) =>
                    handleChange("basic", "website", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              ) : (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {website}
                </a>
              )}
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
              {/* Founder Name */}
              {editMode ? (
                <input
                  type="text"
                  value={founder.name}
                  onChange={(e) =>
                    handleChange("founders", "name", e.target.value, i)
                  }
                  className="w-full border rounded px-2 py-1 font-medium text-gray-800"
                />
              ) : (
                <p className="font-medium text-gray-800">{founder.name}</p>
              )}

              {/* Founder Contacts */}
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                {editMode ? (
                  <>
                    <input
                      type="email"
                      placeholder="Email"
                      value={founder.email || ""}
                      onChange={(e) =>
                        handleChange("founders", "email", e.target.value, i)
                      }
                      className="border rounded px-2 py-1"
                    />
                    <input
                      type="text"
                      placeholder="Contact"
                      value={founder.contact || ""}
                      onChange={(e) =>
                        handleChange("founders", "contact", e.target.value, i)
                      }
                      className="border rounded px-2 py-1"
                    />
                    <input
                      type="url"
                      placeholder="LinkedIn URL"
                      value={founder.linkedin || ""}
                      onChange={(e) =>
                        handleChange("founders", "linkedin", e.target.value, i)
                      }
                      className="border rounded px-2 py-1"
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>

              {/* Founder Bio */}
              {editMode ? (
                <textarea
                  placeholder="Bio"
                  value={founder.bio || ""}
                  onChange={(e) =>
                    handleChange("founders", "bio", e.target.value, i)
                  }
                  className="w-full border rounded px-2 py-1 text-sm mt-2"
                />
              ) : (
                founder.bio && (
                  <p className="mt-2 text-sm text-gray-500 italic">
                    {founder.bio}
                  </p>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Startup Overview */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-gray-800">Startup Overview</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          {["pitch", "problem", "solution", "stage", "founded"].map((field) => (
            <div key={field}>
              <p className="font-medium capitalize">
                {field === "pitch"
                  ? "One-liner Pitch"
                  : field === "problem"
                    ? "Problem Statement"
                    : field === "solution"
                      ? "Solution"
                      : field === "stage"
                        ? "Current Stage"
                        : "Year Founded"}
              </p>
              {editMode ? (
                <input
                  type="text"
                  value={overview?.[field] || ""}
                  onChange={(e) =>
                    handleChange("overview", field, e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              ) : (
                <p>{overview?.[field]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      {editMode && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditMode(false);
              // TODO: Save formData to backend
            }}
            className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default StartupDetailsCard;
