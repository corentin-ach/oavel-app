import { StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Colors,
  ProgressBar,
  Text,
  TextField,
  View,
} from 'react-native-ui-lib';
import LottieView from 'lottie-react-native';
import goodQuality from '../../assets/goodQuality.json';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ModalView from '../../components/modal.component';
import MapView from '../../components/map.component';

function Home() {
  const boxHeight = useSharedValue('15%');
  const truncatedAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(boxHeight.value, { duration: 400 }),
    };
  }, []);
  const showBar = () => {
    boxHeight.value === '15%'
      ? (boxHeight.value = '25%')
      : (boxHeight.value = '15%');
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            padding: 15,
            paddingTop: 60,
            height: '15%',
            backgroundColor: 'white',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: 2,
          },
          truncatedAnimation,
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <LottieView
            autoPlay
            style={{
              width: 50,
              height: 50,
            }}
            source={goodQuality}
          />
          <View>
            <Text style={{ fontWeight: '800', fontSize: 20 }}>Newy Beach</Text>
            <Text>Last update on 18 May</Text>
          </View>
          <View>
            <Button
              labelStyle={{ fontSize: 20 }}
              label="🔍"
              round
              backgroundColor={Colors.white}
              onPress={showBar}
            />
          </View>
        </View>
      </Animated.View>
      <MapView />
      <ModalView />
    </View>
  );
}

// display multiple markers on the mapview component

export default Home;
