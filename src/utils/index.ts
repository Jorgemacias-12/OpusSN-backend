export const hashPassword = async (text: string) => {
  const hashedPassword = await Bun.password.hash(text, {
    algorithm: "bcrypt",
  })

  return hashedPassword;
}

export const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
  return await Bun.password.verify(plainPassword, hashedPassword);
}