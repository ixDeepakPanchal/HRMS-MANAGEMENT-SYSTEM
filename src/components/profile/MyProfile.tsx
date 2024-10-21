import { Avatar, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ProfileData from "./ProfileData";
import { FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { useEffect, useRef, useState } from "react";
import { Employee } from "../types/employeeDataType";
import { editImage } from "../../store/AuthSlice";
import LoadingPage from "../loading/LoadingPage";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const uploadFileInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  let myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );
  const users = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  ).filter(data => data.authInfo.email === myInfo.authInfo.email);

  myInfo = users[0]

  useEffect(() => {
    if (myInfo)

      setLoading(false);
  }, [myInfo, users]);
  const handleImageChange = () => {
    if (uploadFileInput.current) {
      uploadFileInput.current.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedImageUrl = reader.result as string;
        dispatch(
          editImage({ type: "CHANGE_MY_IMAGE", data: uploadedImageUrl })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfile = () => {
    dispatch(editImage({ type: "REMOVE_MY_IMAGE" }));
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="h-full w-full flex flex-col ">
      <div className="background-bg bg-local relative  h-[12rem] flex flex-col justify-center items-center p-4" >
        <Popover
          placement="bottom"
          content={
            <div className="text-sm text-gray-700 font-semibold cursor-pointer min-w-40">
              <div
                className="h-5 hover:border hover:bg-gray-50  p-4 rounded-md flex items-center"
                onClick={handleImageChange}
              >
                <FaImage className="mr-2" />
                Change Image
              </div>
              <div
                className="h-5 hover:border hover:bg-gray-50  p-4 rounded-md flex items-center"
                onClick={() => handleRemoveProfile()}
              >
                <FaTrash className="mr-2" />
                Remove Image
              </div>
            </div>
          }
        >
          <Avatar
            className="border border-white"
            size={112}
            icon={
              <>
                {myInfo.profileImages?.myImage ? (
                  <img
                    src={`${myInfo.profileImages.myImage}`}
                    alt="Uploaded"
                    loading="lazy"
                  />
                ) : (
                  <IoPerson />
                )}
              </>
            }
          />
        </Popover>
        <div
          className="absolute right-0 bottom-0 text-white font-bold flex justify-end items-center px-5 hover:cursor-pointer"
          onClick={() =>
            navigate("/myprofile/edit", {
              state: { id: myInfo.authInfo.email },
            })
          }
        >
          <LiaUserEditSolid size={20} className="mr-2  rounded-full " />
          Edit Details
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={uploadFileInput}
        style={{ display: "none" }} // Hide the input
        onChange={(e) => handleImageUpload(e)}
      />

      <div className="  h-[400px] grid grid-cols-4 gap-3 p-3">
        <ProfileData myInfo={myInfo}></ProfileData>
      </div>
    </div>
  );
}

export default MyProfile;
