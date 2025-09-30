export interface IDomain {
  domain: string;
  cloudflareId: string;
  status: string;
  createdAt: string;
  verificationToken?: string;
  verificationRecordName?: string;
}
