import { View } from 'react-native-ui-lib';
import ModalView from '../../components/modal.component';
import MapView from '../../components/map.component';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Header from '../../components/header.component';
import { useGetFirestore } from '../../firebase/api';
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

function Home() {
  const { spot } = useSelector((state: RootState) => state);
  const spots = useGetFirestore('spots');
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View style={{ flex: 1 }}>
      <Header spot={spot} />
      <MapView bottomSheetRef={bottomSheetRef} />
      <ModalView spot={spot} spots={spots} bottomSheetRef={bottomSheetRef} />
    </View>
  );
}
export default Home;
