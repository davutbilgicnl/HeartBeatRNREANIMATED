import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const SIZE = 100;
const HeartBeat = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.9), -1, true);
    scale.value = withRepeat(withSpring(1, { duration: 400 }), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.heartContainer, reanimatedStyle]}>
        <Svg height={SIZE} width={SIZE} viewBox="0 0 24 24">
          <Path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#b50000"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default HeartBeat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartContainer: {
    width: SIZE,
    height: SIZE,
  },
});
