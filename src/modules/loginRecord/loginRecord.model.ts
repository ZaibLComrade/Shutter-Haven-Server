import { Schema, model, Document } from 'mongoose';
import { IUser } from '../../@types';

interface IRecordLogin extends Document {
  user: IUser['_id']; // Reference to the user who attempted the login
  success: boolean; // Whether the login attempt was successful or not
  loginTime: Date; // The time of the login attempt
  ipAddress?: string; // The IP address from which the login was attempted
  deviceInfo?: string; // Information about the device (e.g., browser, OS)
  errorMessage?: string; // Optional message if login failed (e.g., "incorrect password")
  sessionStart?: Date; // The time when the session started
  sessionEnd?: Date; // The time when the session ended
  sessionDuration?: number; // The duration of the session in seconds (optional)
  clientId?: string; // The ID of the client (e.g., mobile app, web app)
  deviceType?: string; // Type of device (e.g., mobile, desktop)
  userAgent?: string; // User-Agent info from the request header
}

const RecordLoginSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
    success: { type: Boolean, required: true }, // Success flag
    loginTime: { type: Date, default: Date.now }, // Time of login attempt
    ipAddress: { type: String }, // IP address (optional)
    deviceInfo: { type: String }, // Device information (optional)
    errorMessage: { type: String }, // Error message for failed logins (optional)
    sessionStart: { type: Date }, // Session start time
    sessionEnd: { type: Date }, // Session end time
    sessionDuration: { type: Number }, // Session duration in seconds
    clientId: { type: String }, // Client ID (e.g., mobile app, web app)
    deviceType: { type: String }, // Device type (mobile/desktop)
    userAgent: { type: String }, // User-Agent string from request headers
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const RecordLogin = model<IRecordLogin>('RecordLogin', RecordLoginSchema);

export default RecordLogin;

