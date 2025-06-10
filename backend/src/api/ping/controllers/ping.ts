// src/api/ping/controllers/ping.ts

import { Context } from 'koa';

export default {
  ping: async (ctx: Context) => {
    ctx.body = {
      message: 'pong',
      timestamp: new Date().toISOString(),
      status: 200
    };
  }
};