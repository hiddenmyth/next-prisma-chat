import { create } from 'zustand';

export interface IOrganization {
  name: string;
  description?: string;
  image?: string;
}

export interface IOrganizationStore {
  data: IOrganization[];
  // eslint-disable-next-line no-unused-vars
  setData: (_val: IOrganization[]) => void;
  currentOrganization: IOrganization | undefined;
  // eslint-disable-next-line no-unused-vars
  setCurrentOrganiazation: (_val?: IOrganization) => void;
}

// eslint-disable-next-line no-unused-vars
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
