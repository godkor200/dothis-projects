import { Request, Response } from 'express';

export function envDiscrimination(req: Request): boolean {
  return req.headers['X-Client-Environment'] === 'local';
}
