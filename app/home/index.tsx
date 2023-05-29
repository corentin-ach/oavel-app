import { View } from 'react-native-ui-lib';
import ModalView from '../../components/modal.component';
import MapView from '../../components/map.component';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Header from '../../components/header.component';
import { useGetFirestore } from '../../firebase/api';

function Home() {
  const { spot } = useSelector((state: RootState) => state);
  const spots = useGetFirestore('spots');

  return (
    <View style={{ flex: 1 }}>
      <Header spot={spot} />
      <MapView />
      <ModalView spot={spot} spots={spots} />
    </View>
  );
}
export default Home;
