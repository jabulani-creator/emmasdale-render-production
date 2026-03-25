export interface User {
  _id: string;
  name: string;
  email: string;
  lastname?: string;
  position?: string;
  role?: string;
  // add other fields if necessary
}

export interface Event {
  _id: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  time: string;
  eventImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  _id: string;
  postTitle: string;
  postDesc: string;
  postImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HealthPost {
  _id: string;
  healthTitle: string;
  healthDesc: string;
  healthImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactRequest {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  purpose?: 'prayer' | 'baptism' | 'membership' | 'wedding';
  day?: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Personnel {
  _id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  image?: string;
}

export interface Review {
  _id: string;
  ReviewName: string;
  ReviewDesc: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Resource {
  _id: string;
  title?: string;
  description?: string;
  pdf?: string;
}

export interface ImageDoc {
  _id: string;
  department?: 'Youth' | 'Women' | 'Music' | 'Amo' | 'all';
  image: string;
}

export interface AppState {
  isLoading: boolean;
  userLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: User | null;
  userPosition: string;
  isEditing: boolean;
  editHealthId: string;
  showSidebar: boolean;
  posts: Post[];
  events: Event[];
  images: ImageDoc[];
  pastors: Personnel[];
  workers: Personnel[];
  leaders: Personnel[];
  elders: Personnel[];
  reviews: Review[];
  totalImages: number;
  numOfImagePages: number;
  departmentOptions: string[];
  department: string;
  searchDepartment: string;
  totalEvents: number;
  numOfEventsPages: number;
  editEventId: string;
  totalPost: number;
  numOfpages: number;
  page: number;
  healthPosts: HealthPost[];
  totalHealthPost: number;
  numOfHealthPages: number;
  search: string;
  sort: string;
  sortOptions: string[];
  name: string;
  phone: string;
  email: string;
  day: string;
  message: string;
  purposeOptions: string[];
  purpose: string;
  requests: ContactRequest[];
  totalRequests: number;
  numOfRequestPages: number;
  searchPurpose: string;
  resources: Resource[];
}

export interface AppContextType extends AppState {
  displayAlert: () => void;
  registerUser: (user: any) => Promise<void>;
  loginUser: (user: any) => Promise<void>;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
  updateUser: (user: any) => Promise<void>;
  handleChange: (payload: { name: string; value: any }) => void;
  clearValues: () => void;
  createPost: (post: any) => Promise<void>;
  createHealthPost: (health: any) => Promise<void>;
  createEvent: (event: any) => Promise<void>;
  getPosts: () => Promise<void>;
  getHealthPost: () => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  editPost: (id: string, post: any) => Promise<void>;
  setEditHealthPost: (id: string) => void;
  deleteHealthPost: (id: string) => Promise<void>;
  editHealth: () => Promise<void>;
  clearFilters: () => void;
  changePage: (page: number) => void;
  createRequest: () => Promise<void>;
  getRequests: () => Promise<void>;
  deleteRequest: (id: string) => Promise<void>;
  getEvents: () => Promise<void>;
  setEditEvent: (id: string) => void;
  deleteEvent: (id: string) => Promise<void>;
  editEvent: (id: string, event: any) => Promise<void>;
  createPosition: (leader: any) => Promise<void>;
  closeSubmenu: () => void;
  openSubmenu: (text: string, coordinates: any) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  isSubmenuOpen: boolean;
  isSidebarOpen: boolean;
  location: any;
  page: any;
  getPhotos: () => Promise<void>;
  createBulleting: (bulleting: any) => Promise<void>;
  uploadImage: (image: any) => Promise<void>;
  createPastor: (pastor: any) => Promise<void>;
  createWorker: (worker: any) => Promise<void>;
  getPastors: () => Promise<void>;
  getPositions: () => Promise<void>;
  getWorkers: () => Promise<void>;
  createElder: (elder: any) => Promise<void>;
  getElders: () => Promise<void>;
  createReview: (review: any) => Promise<void>;
  getReviews: () => Promise<void>;
  createResource: (resource: any) => Promise<void>;
  getResources: () => Promise<void>;
  authFetch: any;
}
