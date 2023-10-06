export interface IRes<T> {
  success: boolean;
  data?: T | any;
}
