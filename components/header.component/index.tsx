import AnimatedLottieView from 'lottie-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import goodQuality from '../../assets/animation/goodQuality.json';
import badQuality from '../../assets/animation/badQuality.json';
import { SpotState } from '../../redux/spot';
import { useStatusInBounds } from '../../functions/useStatusInBounds';

type Props = {
  spot: SpotState;
};

function Header(props: Props) {
  const { spot } = props;
  const boxHeight = useSharedValue('15%');
  const truncatedAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(boxHeight.value, { duration: 400 }),
    };
  }, []);

  const { warningInBounds } = useStatusInBounds();

  return (
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
          justifyContent: 'space-between',
        }}
      >
        <AnimatedLottieView
          autoPlay
          style={{
            width: 50,
            height: 50,
          }}
          source={warningInBounds ? badQuality : goodQuality}
        />
        <View>
          <Text style={{ fontWeight: '800', fontSize: 20 }}>
            {warningInBounds ? 'Dangerous,' : 'Welcome,'}
          </Text>
          <Text>
            {warningInBounds
              ? 'be careful around this area'
              : 'no perturbations here'}
          </Text>
        </View>
      </View>
      {/* <Button
        label="Confirm alert 👍"
        size={Button.sizes.medium}
        backgroundColor="white"
        labelStyle={{ color: 'black' }}
        outline
        outlineColor={Colors.orange30}
      /> */}
    </Animated.View>
  );
}

export default Header;
