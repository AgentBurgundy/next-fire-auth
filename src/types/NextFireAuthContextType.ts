import { User } from "firebase/auth";

export type NextFireAuthContextType = {
  user: User | null;
  setLoading: (value: any) => void;
};
