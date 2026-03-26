import { create } from 'zustand';
import axios from 'axios';
import { authFetch, API_URL } from './useAuthStore';
import { useFormStore } from './useFormStore';
import { Post, Event, HealthPost, ContactRequest, Personnel, Review, Resource, ImageDoc } from '../types';

interface DataState {
  isLoading: boolean;
  posts: Post[];
  totalPost: number;
  numOfpages: number;
  
  healthPosts: HealthPost[];
  totalHealthPost: number;
  numOfHealthPages: number;

  events: Event[];
  totalEvents: number;
  numOfEventsPages: number;

  requests: ContactRequest[];
  totalRequests: number;
  numOfRequestPages: number;

  images: ImageDoc[];
  totalImages: number;
  numOfImagePages: number;

  pastors: Personnel[];
  workers: Personnel[];
  leaders: Personnel[];
  elders: Personnel[];
  reviews: Review[];
  resources: Resource[];

  // Actions
  getPosts: () => Promise<void>;
  createPost: (post: any) => Promise<void>;
  editPost: (id: string, post: any) => Promise<void>;
  deletePost: (id: string) => Promise<void>;

  getHealthPost: () => Promise<void>;
  createHealthPost: (health: any) => Promise<void>;
  editHealth: (id: string, health: any) => Promise<void>;
  deleteHealthPost: (id: string) => Promise<void>;
  createSermon: (sermon: any) => Promise<void>;

  getEvents: () => Promise<void>;
  createEvent: (event: any) => Promise<void>;
  editEvent: (id: string, event: any) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  getRequests: (params?: any) => Promise<void>;
  createRequest: (request: any) => Promise<void>;
  deleteRequest: (id: string) => Promise<void>;

  getPhotos: () => Promise<void>;
  uploadImage: (image: any) => Promise<void>;

  getPastors: () => Promise<void>;
  createPastor: (pastor: any) => Promise<void>;

  getWorkers: () => Promise<void>;
  createWorker: (worker: any) => Promise<void>;

  getPositions: () => Promise<void>;
  createPosition: (leader: any) => Promise<void>;

  getElders: () => Promise<void>;
  createElder: (elder: any) => Promise<void>;

  getReviews: () => Promise<void>;
  createReview: (review: any) => Promise<void>;

  getResources: () => Promise<void>;
  createResource: (resource: any) => Promise<void>;

  createBulleting: (bulleting: any) => Promise<void>;
}

export const useDataStore = create<DataState>((set, get) => ({
  isLoading: false,
  posts: [],
  totalPost: 0,
  numOfpages: 1,
  healthPosts: [],
  totalHealthPost: 0,
  numOfHealthPages: 1,
  events: [],
  totalEvents: 0,
  numOfEventsPages: 1,
  requests: [],
  totalRequests: 0,
  numOfRequestPages: 1,
  images: [],
  totalImages: 0,
  numOfImagePages: 1,
  pastors: [],
  workers: [],
  leaders: [],
  elders: [],
  reviews: [],
  resources: [],

  getPosts: async () => {
    const { page, search, sort } = useFormStore.getState();
    let url = `${API_URL}/posts?page=${page}&sort=${sort}`;
    if (search) url += `&search=${search}`;
    
    set({ isLoading: true });
    try {
      const { data } = await axios.get(url);
      set({ posts: data.posts, totalPost: data.totalPost, numOfpages: data.numOfpages, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  
  createPost: async (currentPost) => {
    try {
      await authFetch.post("/posts", currentPost);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw new Error(error.response?.data?.msg || "Error creating post");
    }
  },

  editPost: async (postId, currentPost) => {
    try {
      await authFetch.patch(`/posts/${postId}`, currentPost, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      useFormStore.getState().clearValues();
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw new Error(error.response?.data?.msg || "Something went wrong");
    }
  },

  deletePost: async (postId) => {
    try {
      await authFetch.delete(`/posts/${postId}`);
      get().getPosts();
    } catch (error) {
      console.log(error);
    }
  },

  getHealthPost: async () => {
    const { page, search, sort } = useFormStore.getState();
    let url = `${API_URL}/health?page=${page}&sort=${sort}`;
    if (search) url += `&search=${search}`;
    
    set({ isLoading: true });
    try {
      const { data } = await axios.get(url);
      set({ healthPosts: data.healthPosts, totalHealthPost: data.totalHealthPost, numOfHealthPages: data.numOfHealthPages, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },

  createHealthPost: async (health) => {
    try {
      await authFetch.post("/health", health);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw new Error(error.response?.data?.msg || "Error creating health post");
    }
  },

  editHealth: async (id, health) => {
    try {
      await authFetch.patch(`/health/${id}`, health, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      useFormStore.getState().clearValues();
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw new Error(error.response?.data?.msg || "Error editing health post");
    }
  },

  deleteHealthPost: async (healthPostId) => {
    try {
      await authFetch.delete(`/health/${healthPostId}`);
      get().getHealthPost();
    } catch (error) {
      console.log(error);
    }
  },

  getEvents: async () => {
    let url = `${API_URL}/events`;
    set({ isLoading: true });
    try {
      const { data } = await axios.get(url);
      set({ events: data.events, totalEvents: data.totalEvents, numOfEventsPages: data.numOfEventsPages, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },

  createEvent: async (currentEvent) => {
    try {
      await authFetch.post("/events", currentEvent);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw new Error(error.response?.data?.msg || "Error creating event");
    }
  },

  editEvent: async (eventId, event) => {
    try {
      await authFetch.patch(`events/${eventId}`, event, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      useFormStore.getState().clearValues();
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw new Error(error.response?.data?.msg || "Error editing event");
    }
  },

  deleteEvent: async (eventId) => {
    try {
      await authFetch.delete(`events/${eventId}`);
      get().getEvents();
    } catch (error) {
      console.log(error);
    }
  },

  getRequests: async () => {
    const { searchPurpose, page, sort } = useFormStore.getState();
    let url = `/contact?page=${page}&purpose=${searchPurpose}&sort=${sort}`;
    set({ isLoading: true });
    try {
      const { data } = await authFetch(url);
      set({ requests: data.requests, totalRequests: data.totalRequests, numOfRequestPages: data.numOfRequestPages, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      console.log(error.response);
    }
  },

  createRequest: async (requestData) => {
    try {
      await axios.post(`${API_URL}/contact`, requestData);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      throw new Error(error.response?.data?.msg || "Error creating request");
    }
  },

  deleteRequest: async (requestId) => {
    try {
      await authFetch.delete(`/contact/${requestId}`);
      get().getRequests();
    } catch (error) {
      console.log(error);
    }
  },

  getPhotos: async () => {
    const { page, search, searchDepartment } = useFormStore.getState();
    let url = `${API_URL}/image?page=${page}&department=${searchDepartment}`;
    if (search) url += `&search=${search}`;
    
    set({ isLoading: true });
    try {
      const { data } = await axios.get(url);
      set({ images: data.images, totalImages: data.totalImages, numOfImagePages: data.numOfImagePages, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },

  uploadImage: async (image) => {
    try {
      await authFetch.post("/image", image);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      throw new Error(error.response?.data?.msg || "Error uploading image");
    }
  },

  getPastors: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/pastor`);
      set({ pastors: data.pastors });
    } catch (error) {}
  },

  createPastor: async (pastor) => {
    try {
      await authFetch.post("/pastor", pastor);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      throw new Error(error.response?.data?.msg || "Error creating pastor");
    }
  },

  getWorkers: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/worker`);
      set({ workers: data.workers });
    } catch (error) {}
  },

  createWorker: async (worker) => {
    try {
      await authFetch.post("/worker", worker);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      throw new Error(error.response?.data?.msg || "Error creating worker");
    }
  },

  getPositions: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/position`);
      set({ leaders: data.leaders });
    } catch (error) {}
  },

  createPosition: async (currentLeader) => {
    try {
      await authFetch.post("/position", currentLeader);
    } catch (error: any) {
      throw new Error(error.response?.data?.msg || "Error creating position");
    }
  },

  getElders: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/elder`);
      set({ elders: data.elders });
    } catch (error) {}
  },

  createElder: async (elder) => {
    try {
      await authFetch.post("/elder", elder);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      throw new Error(error.response?.data?.msg || "Error creating elder");
    }
  },

  getReviews: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/review`);
      set({ reviews: data.reviews });
    } catch (error) {}
  },

  createReview: async (review) => {
    try {
      await axios.post(`${API_URL}/review`, review);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      throw new Error(error.response?.data?.msg || "Error creating review");
    }
  },

  getResources: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/resource`);
      set({ resources: data.resources });
    } catch (error) {
      console.log(error);
    }
  },

  createResource: async (resource) => {
    try {
      await authFetch.post("/resource", resource);
      useFormStore.getState().clearValues();
    } catch (error: any) {
      throw new Error(error.response?.data?.msg || "Error creating resource");
    }
  },

  createBulleting: async (bulleting) => {
    try {
      await authFetch.post("/pdf", bulleting, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      useFormStore.getState().clearValues();
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw new Error(error.response?.data?.msg || "Error creating bulleting");
    }
  },

  createSermon: async (sermon) => {
    try {
      await authFetch.post("/sermons", sermon);
    } catch (error: any) {
      throw new Error(error.response?.data?.msg || "Error creating sermon");
    }
  },
}));
