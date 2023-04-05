import { User } from "./user";

export interface TableState {
    data: User[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
  }