import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Colors, Text, TextField } from 'react-native-ui-lib';
import { useState } from 'react';

export default function Modal() {
  const router = useRouter();
  const [selectionColor, setSelectionColor] = useState({
    water: false,
    plastic: false,
    risk: false,
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30,
      }}
    >
      <View>
        <Text text40 style={{ fontWeight: '800' }}>
          📢 Send a new alert
        </Text>
        <View
          style={{
            flexDirection: 'column',
            height: 140,
            marginTop: 15,
          }}
        >
          <View
            onTouchStart={() => {
              setSelectionColor({
                ...selectionColor,
                water: !selectionColor.water,
              });
            }}
            style={[
              {
                display: 'flex',
                borderRadius: 10,
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
                backgroundColor: selectionColor.water
                  ? Colors.orange60
                  : Colors.white,
              },
            ]}
          >
            <Text text40>🌊</Text>
            <Text>Water</Text>
          </View>
          <Card
            onPress={() =>
              setSelectionColor({
                ...selectionColor,
                plastic: !selectionColor.plastic,
              })
            }
            flex
            center
            style={{
              display: 'flex',
              borderRadius: 10,
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
              backgroundColor: selectionColor.plastic
                ? Colors.orange60
                : Colors.white,
            }}
          >
            <Text text40>🧃</Text>
            <Text>Plastic</Text>
          </Card>
          <Card
            onPress={() =>
              setSelectionColor({
                ...selectionColor,
                risk: !selectionColor.risk,
              })
            }
            flex
            center
            style={{
              display: 'flex',
              borderRadius: 10,
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: selectionColor.risk
                ? Colors.orange60
                : Colors.white,
            }}
          >
            <Text text40>🦈</Text>
            <Text>Risk</Text>
          </Card>
        </View>
        <Text style={{ marginTop: 10 }}>Select the types</Text>
        <TextField
          placeholder={'Any observation?'}
          floatingPlaceholder
          showCharCounter
          maxLength={300}
          multiline
        />
      </View>

      <View style={{ width: '100%', marginBottom: 20 }}>
        <Button
          onPress={() => router.push('../')}
          label="Alert"
          style={{
            backgroundColor: Colors.orange40,
            marginBottom: 10,
          }}
        />
        <Button
          link
          onPress={() => router.push('../')}
          label="Cancel"
          color="black"
        />
      </View>
    </View>
  );
}
