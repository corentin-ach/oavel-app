/* eslint-disable unicorn/filename-case */
/* eslint-disable unicorn/no-null */

import { useSelector } from 'react-redux';
import { useGetFirestore } from '../firebase/api';
import { RootState } from '../redux/store';
import { SpotState, setSpot } from '../redux/spot';

/**
 * *Compute the points wich are into the screen bounds
 */
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

  const spotToSnap = spotInBounds.length === 1 ? spotInBounds[0] : null;

  const warningInBounds = spotInBounds.find((s: SpotState) => s.status);
  return { warningInBounds, spotToSnap };
}
