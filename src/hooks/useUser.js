

// export const useUser = () => {
//   return {userName: "Abhijeet", userId: 1, token: "token"}
// };

import { useRecoilValue } from 'recoil';
import { userAtom } from '../store';

export const useUser = () => {
  const value = useRecoilValue(userAtom);
  return value;
};
