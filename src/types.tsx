export interface ButtonProps {
  onSort: () => void;
  title: string;
  sort: string;
}

export interface UserProp {
  id: string;
  image: string;
  fullName: string;
  age: number;
  gender: string;
  designation: string;
  state: string;
  country: string;
}

export interface UsersDataProps {
  address: {
    address: string;
    city: string;
    coordinates: void;
    country: string;
    postalCode: string;
    state: string;
    stateCode: string;
  };
  age: number;
  bank: void;
  birthDate: string;
  bloodGroup: string;
  company: {
    title: string;
    name: string;
    department: string;
    address: {
      address: string;
      city: string;
      coordinates: void;
    };
  };
  crypto: string;
  ein: string;
  email: string;
  eyecolor: string;
  firstName: string;
  gender: string;
  hair: void;
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}
