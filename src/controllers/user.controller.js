import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
  //get user details from user
  //validation
  //check if user already exists: username, email
  //check for images, avatar
  //upload them to cloudinary
  // check cloudinary get avatar
  // create user object - create entry in DB
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullname, email, username, password } = req.body;
  if (fullname === "") {
    throw new ApiError(400, "fullname is required");
  } else if (email === "") {
    throw new ApiError(400, "email is required");
  } else if (username === "") {
    throw new ApiError(400, "username is required");
  } else if (password === "") {
    throw new ApiError(400, "Password is required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
   throw new ApiError(400, "Avatar file is required");

  }
const user = await User.create({
   fullname,
   avatar: avatar.url,
   coverImage: coverImage?.url || "",
   email,
   password,
   username: username.toLowerCase()
})
const createuser = await User.findById(user._id).select(
   "-password -refreshToken"
)
if(!createuser){
   throw new ApiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(
   new ApiResponse(200, createuser, "User registered successfully")
)
});

export { registerUser };
