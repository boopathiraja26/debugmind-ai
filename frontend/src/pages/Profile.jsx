import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProfile, updateProfile } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setUser(res.data.data.user);

      setName(res.data.data.user.name);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const saveProfile = async () => {
    try {
      await updateProfile({ name });

      toast.success("Profile Updated");

      loadProfile();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!user)
    return (
      <div className="container-shell py-20">
        Loading...
      </div>
    );

  return (
    <div className="container-shell max-w-xl py-10">

      <div className="rounded-xl bg-[#111827] p-8">

        <h1 className="mb-6 text-3xl font-bold">

          My Profile

        </h1>

        <div className="space-y-5">

          <div>

            <label>Name</label>

            <input
              className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-900 p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <div>

            <label>Email</label>

            <input
              disabled
              value={user.email}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
            />

          </div>

          <div>

            <label>Role</label>

            <input
              disabled
              value={user.role}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
            />

          </div>

          <button
            onClick={saveProfile}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;