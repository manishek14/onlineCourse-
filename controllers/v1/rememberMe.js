exports.remember = async (req, res) => {
  const user = await userModel.findOne({
    username,
    name,
    email,
    phoneNumber,
    password: hashedPass,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });
  const accessToken = jwt.sign(
    { id: user._id, role: user.role , password : user._password },
    process.env.JWT_SECRET,
    { expiresIn: "14 day" },
  );
  res.cookie("token", accessToken ,{
    httpOnly: true,
    maxAge: 1209600000,
    secure: true,
    signed: true,
    sameSite: "none",
  });
  res.status(201).json({ message: "cookie created successfully" });
};