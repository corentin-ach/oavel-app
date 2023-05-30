/* eslint-disable unicorn/no-null */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetFooter } from '@gorhom/bottom-sheet';
import { Button, Card, Chip, Colors, Text, View } from 'react-native-ui-lib';
import { useSharedValue } from 'react-native-reanimated';
import { SpotState, setSpot } from '../../redux/spot';
import { computeStatusColor } from '../../functions/computeStatusColor';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { useStatusInBounds } from '../../functions/useStatusInBounds';

type Props = {
  spot: SpotState;
  spots: Array<SpotState>;
  bottomSheetRef: React.RefObject<BottomSheet>;
};

function ModalView(props: Props) {
  const { spot, spots, bottomSheetRef } = props;
  const snapPoints = ['40%', '10%'];
  const dispatch = useDispatch();

  const s = spots?.find((item) => item.id === spot.id);

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View flex right style={{ padding: 20 }}>
          <Button
            label="📢"
            round
            style={{ backgroundColor: Colors.orange40, height: 60, width: 60 }}
          />
        </View>
      </BottomSheetFooter>
    ),
    [],
  );

  const filteredInfo = s?.info
    ? Object.entries(s?.info)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => (
          <View key={key} style={{ margin: 3 }}>
            <Chip
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          </View>
        ))
    : null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      footerComponent={renderFooter}
    >
      <View style={{ padding: 15 }}>
        <Text text80>{`Last update on ${format(
          new Date(),
          'dd MMM HH:mm',
        )}`}</Text>
        <Text text40 style={{ fontWeight: '800' }}>
          {s?.name}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
          {filteredInfo}
        </View>
        <View style={{ flexDirection: 'row', height: 80, marginTop: 15 }}>
          <Card
            flex
            center
            style={{
              marginRight: 10,
              backgroundColor: computeStatusColor(s?.quality?.water),
            }}
          >
            <Text text40>🌊</Text>
            <Text>Water</Text>
          </Card>
          <Card
            flex
            center
            style={{
              backgroundColor: computeStatusColor(s?.quality?.plastic),
            }}
          >
            <Text text40>🧃</Text>
            <Text>Plastic</Text>
          </Card>
          <Card
            flex
            center
            style={{
              marginLeft: 10,
              backgroundColor: computeStatusColor(s?.quality?.risk),
            }}
          >
            <Text text40>🦈</Text>
            <Text>Risk</Text>
          </Card>
        </View>
        <View
          style={{
            backgroundColor: Colors.grey70,
            padding: 10,
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <Text>{s?.quality?.observation}</Text>
        </View>
      </View>
    </BottomSheet>
  );
}

export default ModalView;
