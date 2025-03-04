import bcrypt from "bcrypt";

export const Cryto = {
  hashPassWord: async (passWord: string): Promise<string> => {
    const saltRounds = 12;
    const hashPassWord = await bcrypt.hash(passWord, saltRounds);

    return hashPassWord;
  },
  compare: async (data: string, encrypted: string): Promise<boolean> => {
    const checkPassWord = await bcrypt.compare(data, encrypted);
    return checkPassWord;
  },
};
