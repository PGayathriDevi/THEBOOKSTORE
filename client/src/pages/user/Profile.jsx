import React, { useEffect, useState } from "react";
import UserMenu from "../../components/UserMenu";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { parse } from "dotenv";

function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`http://localhost:8080/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        (ls = JSON), parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //get user data

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  return (
    <>
      <Layout>
        <div className="flex justify-around items-center">
          <div className=" w-1/3">
            <UserMenu />
          </div>
          <div className=" w-2/3 min-h-full ">
            <h1 className="text-3xl w-full mt-10 text-center font-semibold">PROFILE</h1>
            <div class="flex flex-col items-center justify-center  w-full light">
              <div class="w-2/3 bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">
                  User details
                </h2>

                <form class="flex flex-col text-center">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="email"
                    disabled
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="phone"
                    class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="phone"
                  />
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                  />

                  <button
                    class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Profile;
