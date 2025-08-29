const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const { resetPassword, resetPasswordConfirm } = require("../../controllers/auth/passwordReset");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post('/reset_password',resetPassword);
router.post('/reset_password_confirm/:token',resetPasswordConfirm);
router.put('/profile-update',authMiddleware,async (req,res)=>{
  try{
    const user = req.user;
    const {userName, email} = req.body;
    if(userName) user.userName = userName;
    if(email) user.email = email;
    await user.save();
    res.status(200).json({message:'Profile updated successfully',user});
  }
  catch(err){
    res.status(500).json({message:`There is an error in updating profile: ${err.message}`});
  }
})
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
