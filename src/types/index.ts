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

export type CloudinaryImage = {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
};

export type SearchParams = { [key: string]: string | string[] | undefined };
