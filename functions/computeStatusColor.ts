/* eslint-disable unicorn/filename-case */
import { Colors } from 'react-native-ui-lib';

export function computeStatusColor(quality: number) {
  switch (quality) {
    case 0: {
      return Colors.green70;
    }
    case 1: {
      return Colors.orange70;
    }
    case 2: {
      return Colors.red70;
    }
    // No default
  }
}
