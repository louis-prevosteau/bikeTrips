import { ConfigService } from '@nestjs/config';

export const JwtConstants = {
  token: `${new ConfigService().get('JWT_SECRET')}`,
};
