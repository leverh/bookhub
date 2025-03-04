import { axiosRes } from './axiosDefaults';

export const fetchBookOfTheWeek = async () => {
  try {
    const response = await axiosRes.get('book-of-the-week/');
    return response.data;
  } catch (error) {
    throw error;
  }
};
