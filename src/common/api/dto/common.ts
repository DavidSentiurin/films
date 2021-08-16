export interface ITimestamps {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IErrorRes {
  statusMessage: string;
  statusCode: number;
  success?: boolean;
}
