import { Module } from '@nestjs/common';
import { createClient } from 'redis';

@Module({
  providers: [
    {
      provide: 'RedisClient',
      useFactory: async () => {
        const client = createClient({
          socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          },
        });

        await client.connect();

        return client;
      },
    },
  ],
  exports: ['RedisClient'],
})
export class RedisModule {}
