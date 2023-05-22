import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetFooter } from '@gorhom/bottom-sheet';
import {
  Button,
  Card,
  Colors,
  GridView,
  Text,
  View,
} from 'react-native-ui-lib';
import { useSharedValue } from 'react-native-reanimated';

function ModalView() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const footerPosition = useSharedValue(0);

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View flex right style={{ padding: 20 }}>
          <Button
            label="📢"
            round
            style={{ backgroundColor: Colors.green40, height: 60, width: 60 }}
          />
        </View>
      </BottomSheetFooter>
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      footerComponent={renderFooter}
    >
      <View style={{ padding: 15 }}>
        <Text text40 style={{ fontWeight: '800' }}>
          Live data
        </Text>
        <View style={{ flexDirection: 'row', height: 80 }}>
          <Card flex center style={{ borderRadius: 10 }}>
            <Text text40>🌊</Text>
            <Text>Water</Text>
          </Card>
          <Card flex center>
            <Text text40>🧃</Text>
            <Text>Plastic</Text>
          </Card>
          <Card flex center>
            <Text text40>🦈</Text>
            <Text>Risk</Text>
          </Card>
        </View>
      </View>
    </BottomSheet>
  );
}

export default ModalView;
