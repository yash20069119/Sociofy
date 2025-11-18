export interface Homeele{
  user:User,
}
export interface User {
  _id: number;
  name: string;
  email: string;
  __v: number;
  trustScore: number;
  followers:Array<string>;
  following:Array<string>;
}

export interface NavbarProps {
  onCreatePostClick: () => void;
  user: User;
}
export interface Post {
  createdAt: string | number | Date;
  _id: string;
  user: {
    name: string;
    profilePic: any; username: string 
};
  userId: string;
  timestamp: string;
  caption?: string;
  image?: string;
  likes?: string[];
  comments?: { user: string; text: string }[] | string[];
}

export interface setShowCreatePost {
  setShowCreatePost: (show: boolean) => void;
}
export function User(User: any): [any, any] {
  throw new Error("Function not implemented.");
}