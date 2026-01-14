/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from "react";
import AdminHeader from "../Components/AdminHeader";
import AdminSideBars from "../Components/AdminSideBar";
import { toast } from "react-toastify";
import { getUserDetails, updateProfile } from "../../services/allApi";

const AdminSettings = () => {
  const [preview, setPreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
  );
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    proPic: "",
  });
  useEffect(() => {
    UserDetails();
  }, []);

  const UserDetails = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getUserDetails(header);
      console.log(apiResponse);
      setUserData(apiResponse.data);
    } catch (error) {
      console.log(error);
      toast.error("error occured while fetching the details");
    }
  };
  const onImageClick = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setUserData({ ...userData, proPic: e.target.files[0] });
  };
  const onSubmitClick = async () => {
    try {
      if (
        userData.userName == "" ||
        userData.password == "" ||
        userData.confirmPassword == "" ||
        userData.proPic == ""
      ) {
        toast.error("please fill the form");
      } else {
        if (userData.password == userData.confirmPassword) {
          let reqBody = new FormData();
          // files und so form data ..value edukam for in loop ..aa value reqBody append akan append()
          for (let key in userData) {
            reqBody.append(key, userData[key]);
          }
          let token = localStorage.getItem("token");
          let header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };
          let apiResponse = await updateProfile(userData._id, reqBody, header);
         if(apiResponse.status==200){
          toast.success("Successfully updated")
         }
         else{
          toast.error(apiResponse.response.data.message)
         }
        } else {
          toast.error("recheck password");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while uodating profile");
    }
  };
  const onResetClick=()=>{
    setUserData({
      userName: "",
    password: "",
    confirmPassword: "",
    proPic: ""
    })
    setPreview("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s")
  }
  return (
    <div>
      <AdminHeader />

      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSideBars />

        <div className="flex justify-between">
          <div className="text-justify mt-9 mx-30">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium dolores eligendi, inventore ea voluptatibus minus
            quibusdam. Recusandae unde tempore dolores eveniet porro,
            perspiciatis sequi alias cumque, nobis exercitationem animi.
            Tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nemo laudantium eligendi error molestiae magni explicabo rem animi
            aperiam, voluptatum illum eveniet earum commodi consectetur ipsum
            provident recusandae. Unde, qui ipsa?
          </div>
          <div className="mt-9  me-8">
            <div className="bg-gray-600 w-85 h-100 rounded-2xl">
              <label htmlFor="inp">
                <input type="file" name="" id="inp" onChange={onImageClick} />
                <img src={preview} alt="" className="w-40 rounded m-2" />
              </label>

              <input
                type="text"
                name=""
                id=""
                placeholder="User Name"
                className="bg-white mt-5 ms-5 rounded w-60"
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
                value={userData?.userName}
              />
              <input
                type="password"
                name=""
                id=""
                placeholder="password"
                className="bg-white mt-5 ms-5 rounded w-60"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                value={userData?.password}
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="confirm Password"
                className="bg-white  mt-5 ms-5 rounded w-60"
                onChange={(e) =>
                  setUserData({ ...userData, confirmPassword: e.target.value })
                  
                }
                  value={userData.confirmPassword}
              />
              <div className="flex gap-3 ms-20 mt-3 ">
                <button className="bg-red-800 text-white rounded p-2" onClick={onResetClick}>
                  Reset
                </button>
                <button
                  className="bg-green-800 text-white rounded p-2"
                  onClick={onSubmitClick}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
