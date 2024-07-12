import * as bcrypt from 'bcrypt';

// TODO: configuration files
const saltOrRounds = 10;

export async function hash(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function compareHash(
  password: string,
  hash: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}
