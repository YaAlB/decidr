export interface Location {
    _id: string;
    name: string;
  }
  
  export interface Affiliation {
    _id: string;
    name: string;
  }
  
  export interface Person {
    id: string;
    first_name: string;
    last_name: string;
    locations: Location[];
    affiliations: Affiliation[];
    species?: string;
    gender?: string;
    weapon?: string;
    vehicle?: string;
  }
  