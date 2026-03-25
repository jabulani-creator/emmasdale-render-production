import { create } from 'zustand';

interface FormState {
  isEditing: boolean;
  editHealthId: string;
  editEventId: string;
  page: number;
  search: string;
  sort: string;
  sortOptions: string[];
  
  // Form values
  name: string;
  phone: string;
  email: string;
  day: string;
  message: string;
  purposeOptions: string[];
  purpose: string;
  searchPurpose: string;
  departmentOptions: string[];
  department: string;
  searchDepartment: string;

  // Actions
  handleChange: (name: string, value: any) => void;
  clearValues: () => void;
  clearFilters: () => void;
  changePage: (page: number) => void;
  setEditHealthPost: (id: string) => void;
  setEditEvent: (id: string) => void;
}

const initialFormState = {
  isEditing: false,
  editHealthId: "",
  editEventId: "",
  page: 1,
  search: "",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  name: "",
  phone: "",
  email: "",
  day: "",
  message: "",
  purposeOptions: ["prayer", "baptism", "membership", "wedding"],
  purpose: "prayer",
  searchPurpose: "all",
  departmentOptions: ["Youth", "Women", "Music", "Amo"],
  department: "Music",
  searchDepartment: "all",
};

export const useFormStore = create<FormState>((set) => ({
  ...initialFormState,

  handleChange: (name, value) => set({ [name]: value }),
  
  clearValues: () => set({
    isEditing: false,
    editHealthId: "",
    editEventId: "",
    name: "",
    phone: "",
    email: "",
    day: "",
    message: "",
    purpose: "prayer",
    department: "Music",
  }),

  clearFilters: () => set({
    search: "",
    searchPurpose: "all",
    searchDepartment: "all",
    sort: "latest",
    page: 1,
  }),

  changePage: (page) => set({ page }),
  setEditHealthPost: (id) => set({ isEditing: true, editHealthId: id }),
  setEditEvent: (id) => set({ isEditing: true, editEventId: id }),
}));
