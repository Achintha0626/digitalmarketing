import bcrypt from 'bcryptjs'

export const hashPassword=async(password)=>{
  const salt=await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export  const comparePassword=async(password, hasedPassword)=>{
  const isMatch = await bcrypt.compare(password, hasedPassword)
  return isMatch;
}