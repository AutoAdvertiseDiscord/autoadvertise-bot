import mongoose, { Schema, Document } from "mongoose";

export type LicenseStatus = "pending" | "active" | "expired" | "revoked";
export type LicensePlan = "basic" | "premium" | "lifetime";

export interface ILicense extends Document {
  key: string;
  status: LicenseStatus;
  plan: LicensePlan;
  durationDays: number | null;
  createdBy: string;
  createdByUsername: string;
  redeemedBy: string | null;
  redeemedByUsername: string | null;
  expiresAt: Date | null;
  redeemedAt: Date | null;
  revokedBy: string | null;
  revokedAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const LicenseSchema = new Schema<ILicense>(
  {
    key: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: ["pending", "active", "expired", "revoked"], default: "pending" },
    plan: { type: String, enum: ["basic", "premium", "lifetime"], required: true },
    durationDays: { type: Number, default: null },
    createdBy: { type: String, required: true },
    createdByUsername: { type: String, required: true },
    redeemedBy: { type: String, default: null, index: true },
    redeemedByUsername: { type: String, default: null },
    expiresAt: { type: Date, default: null },
    redeemedAt: { type: Date, default: null },
    revokedBy: { type: String, default: null },
    revokedAt: { type: Date, default: null },
    notes: { type: String, default: null },
  },
  { timestamps: true },
);

export default mongoose.model<ILicense>("License", LicenseSchema);
