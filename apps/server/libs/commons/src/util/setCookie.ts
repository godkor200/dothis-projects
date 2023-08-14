import { Request, Response } from 'express';

export function envDiscrimination(req: Request): boolean {
  return req.hostname.includes('localhost');
}
