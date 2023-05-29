/* eslint-disable unicorn/filename-case */
import { useSelector } from 'react-redux';
import { useGetFirestore } from '../firebase/api';
import { RootState } from '../redux/store';
import { SpotState } from '../redux/spot';

export function useStatusInBounds() {
  const { bounds } = useSelector((state: RootState) => state);

  const spots = useGetFirestore('spots');
  const spotInBounds: Array<SpotState> = spots.filter((s: SpotState) => {
    const lat = s.coords[0];
    const long = s.coords[1];
    return (
      lat >= bounds.sw[1] &&
      lat <= bounds.ne[1] &&
      long >= bounds.sw[0] &&
      long <= bounds.ne[0]
    );
  });

  const warningInBounds = spotInBounds.find((s: SpotState) => s.status);
  return warningInBounds;
}
