import { StyleSheet } from 'react-native';
import { Button, Card, Colors, Text, View } from 'react-native-ui-lib';
import LottieView from 'lottie-react-native';
import goodQuality from '../../assets/goodQuality.json';
import Mapbox from '@rnmapbox/maps';

function Home() {
  Mapbox.setAccessToken(
    'pk.eyJ1IjoiY29yZW50aW4yOSIsImEiOiJja3V3dmgxOG0wMTdpMnZsOGs2OGU4eDQzIn0.p3UORX0_zEWs7XpxBBWMHA',
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 15,
          paddingTop: 60,
          height: '25%',
          backgroundColor: 'white',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <LottieView
            autoPlay
            style={{
              width: 50,
              height: 50,
            }}
            source={goodQuality}
          />
          <View>
            <Text text70>Today, 18 May</Text>
            <Text text60BO style={{ fontWeight: 'bold' }}>
              Newy Beach
            </Text>
          </View>
          <View>
            <Button
              labelStyle={{ fontSize: 20 }}
              label="🔍"
              round
              backgroundColor={Colors.white}
            />
          </View>
        </View>
        <Button
          label="Alert an event"
          backgroundColor={Colors.green30}
          labelStyle={{ fontWeight: 'bold ' }}
        />
      </View>
      <Mapbox.MapView style={{ flex: 1 }} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6BA2B4',
    justifyContent: 'space-around',
  },
});
