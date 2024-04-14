import bcrypt from 'bcrypt';

export const hashPassword = async (text: string) => {
  const saltRounds = 12;

  const hashedPassword = await bcrypt.hash(text, saltRounds);

  return hashedPassword;
}
