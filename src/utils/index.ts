import moment from "moment";

export const hashPassword = async (text: string) => {
  const hashedPassword = await Bun.password.hash(text, {
    algorithm: "bcrypt",
  })

  return hashedPassword;
}

export const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
  return await Bun.password.verify(plainPassword, hashedPassword);
}

export const isValidDate = (value: string) => {
  const formattedDate = moment(value, 'YYYY-MM-DD', true);
  return formattedDate.isValid();
}

export const toIsoDate = (value: Date) => {
  return new Date(value).toISOString();
}