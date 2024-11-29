import { create } from 'zustand';

export interface IOrganization {
  name: string;
  description?: string;
  image?: string;
}

export interface IOrganizationStore {
  data: IOrganization[];
  setData: (val: IOrganization[]) => void;
  currentOrganization: IOrganization | undefined;
  setCurrentOrganiazation: (val?: IOrganization) => void;
}

const useOrganizationStore = create<IOrganizationStore>((set, get) => ({
  data: [
    { name: 'NextUI', description: 'Frontend Library' },
    { name: 'NextJS', description: 'Full stack framework' },
  ],
  setData: (data) => {
    set({ data });
  },
  currentOrganization: undefined,
  setCurrentOrganiazation: (currentOrganization?: IOrganization) => {
    set({ currentOrganization });
  },
}));

export default useOrganizationStore;
