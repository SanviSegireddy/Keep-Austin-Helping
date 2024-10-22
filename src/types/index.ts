export type ResponseEntity = {
  status: "success" | "error" | "info";
  message?: string;
};

export interface UserPreferences {
  userLocations: string[];
  userCategories: string[];
}

export interface Location {
  address: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

export interface VolunteerOpportunity {
  id: number;
  title: string;
  organization: string;
  location: Location;
  description: string;
  start_date: string;
  end_date: string;
  contact_info: string;
  categories: string[];
}
