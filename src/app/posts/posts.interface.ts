export interface IPost {
  title: string;
  id: string;
  body: string;
  userId: number;
}

const defaultPost: IPost = {
  title: 'Add title',
  id: '',
  body: 'Add body',
  userId: 0
}

export const getNewPost = (
  title?: string,
  id?: string,
  body?: string,
  userId?: number,
) => {
  return {
    ...defaultPost,
    title,
    id,
    body,
    userId,
  }
}

export interface IUser {
  id: number;
  username:string;
}
