import config from '@root/configurations/keys';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const bycrpEncryp = item => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(item, saltRounds);
  return hash;
};

export const decodeToken = token => {
  return jwt.verify(token, config.secret);
};
