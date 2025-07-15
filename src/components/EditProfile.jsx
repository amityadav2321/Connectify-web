import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
      setGender(user.gender || "");
      setSkills(user.skills || []);
    }
  }, [user]);

 const saveProfile = async () => {
  setError("");
  try {
    await axios.patch(
      BASE_URL + "/profile/edit",
      { firstName, lastName, about, age, photoUrl, gender, skills },
      { withCredentials: true }
    );

    // ✅ Fetch fresh data to ensure all fields sync correctly
    const response = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
    dispatch(addUser(response.data)); // CORRECT ✅
 // Fully up-to-date profile

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  } catch (err) {
    setError(err.response?.data || "Something went wrong");
  }
};


  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill.toLowerCase())) {
      setSkills([...skills, trimmedSkill]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  if (!user || Object.keys(user).length === 0) {
    return <div className="text-center mt-10 text-lg text-white">Loading user data...</div>;
  }

  return (
     <div className="relative flex flex-col md:flex-row justify-center items-start gap-10 px-4 py-6 text-white min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">

      {/* ✨ Left diagonal gradient bar */}
      <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none"></div>

      {/* ✨ Right diagonal gradient bar */}
      <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none"></div>
      {/* User Preview Card */}
      <UserCard showActions={false} user={{ firstName, lastName, about, age, photoUrl, gender, skills }} />

      {/* Edit Form */}
      <div className="flex justify-center">
        <div className="card bg-gray-900/80 w-96 shadow-lg backdrop-blur-md rounded-xl border border-gray-700">
          <div className="card-body">
            <h2 className="card-title justify-center text-teal-400">Edit Profile</h2>

            {/* Input Fields */}
            {[
              { label: "First Name", value: firstName, set: setFirstName },
              { label: "Last Name", value: lastName, set: setLastName },
              { label: "Photo URL", value: photoUrl, set: setPhotoUrl },
              { label: "Age", value: age, set: setAge, type: "number" }
            ].map(({ label, value, set, type = "text" }) => (
              <fieldset className="pt-2" key={label}>
                <legend className="text-sm text-gray-400">{label}</legend>
                <input
                  type={type}
                  className="input bg-gray-800 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                />
              </fieldset>
            ))}

            {/* Gender Select */}
            <fieldset className="pt-2">
              <legend className="text-sm text-gray-400">Gender</legend>
              <select
                className="select w-full bg-gray-800 text-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </fieldset>

            {/* About Field */}
            <fieldset className="pt-2">
              <legend className="text-sm text-gray-400">About</legend>
              <textarea
                className="textarea bg-gray-800 text-white w-full placeholder-gray-500"
                rows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>

            {/* Skills Section */}
            <fieldset className="pt-2">
              <legend className="text-sm text-gray-400">Skills</legend>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="input input-sm bg-gray-800 text-white placeholder-gray-500 flex-1"
                  placeholder="Enter a skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                />
                <button className="btn btn-sm bg-fuchsia-600 hover:bg-fuchsia-700 text-white" onClick={handleAddSkill}>
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="badge bg-gray-700 text-fuchsia-300 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-600"
                    onClick={() => handleRemoveSkill(index)}
                    title="Click to remove"
                  >
                    {skill} ✕
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Error & Submit */}
            <p className="text-red-400 mt-2 text-sm">{error}</p>
            <div className="card-actions justify-center mt-4">
              <button
                className="btn bg-teal-600 hover:bg-teal-700 text-white w-full"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-teal-700 text-white px-4 py-2 rounded-md shadow-lg border border-teal-400 animate-fade-in">
            Profile saved successfully.
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
