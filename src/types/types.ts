export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export interface ApiResponse<T> {
  statusCode: number;
  data?: T;
}
