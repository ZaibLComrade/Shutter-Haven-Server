import { Request, Response } from 'express';
import { logAppAccess } from './loginRecord.service';

export const appOpen = async (req: Request, res: Response) => {
  const { clientId } = req.headers; // Extract clientId from x-client-id header
  const deviceType = req.headers['x-device-type']; // Extract device type
  const userAgent = req.headers['x-user-agent']; // Extract user agent

  try {
    const ipAddress = req.ip; // Capture the IP address
    const accessRecord = await logAppAccess(
      clientId as string,
      ipAddress as string,
      deviceType as string,
      userAgent as string
    );

    res.status(200).json({ message: 'App opened and access logged', accessRecord });
  } catch (error) {
    console.error('Error logging app access:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
