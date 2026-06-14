import {
  Animated,
  Easing,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const APP_URL = "https://time-converter-woad-iota.vercel.app/";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-3012411444875177/8300847790";

const bannerSize = BannerAdSize.ANCHORED_ADAPTIVE_BANNER;

function App() {
  const isDarkMode = useColorScheme() === "dark";
  const [isLoading, setIsLoading] = useState(true);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isLoading) {
      progressAnim.stopAnimation();
      progressAnim.setValue(0);
      return;
    }

    const progressLoop = Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    );

    progressLoop.start();

    return () => {
      progressLoop.stop();
    };
  }, [isLoading, progressAnim]);

  const progressTranslateX = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-180, 180],
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: APP_URL }}
            style={styles.webview}
            automaticallyAdjustContentInsets
            contentInsetAdjustmentBehavior="automatic"
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          {isLoading ? (
            <>
              <View style={styles.loadingOverlay}>
                <View style={styles.progressTrack}>
                  <Animated.View
                    style={[
                      styles.progressBar,
                      { transform: [{ translateX: progressTranslateX }] },
                    ]}
                  />
                </View>
              </View>
              <View>
                <BannerAd
                  unitId={adUnitId}
                  size={bannerSize}
                  onAdLoaded={() => console.log("Ad loaded")}
                  onAdFailedToLoad={(error) =>
                    console.error("Ad failed:", error)
                  }
                />
              </View>
            </>
          ) : null}
        </View>
        <View>
          <BannerAd
            unitId={adUnitId}
            size={bannerSize}
            onAdLoaded={() => console.log("Ad loaded")}
            onAdFailedToLoad={(error) => console.error("Ad failed:", error)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  webviewContainer: {
    flex: 1,
    position: "relative",
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    backgroundColor: "#f7fbfc",
    justifyContent: "center",
  },
  progressTrack: {
    width: 180,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#e5f2f5",
    overflow: "hidden",
  },
  progressBar: {
    width: 120,
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#2b9eb3",
  },
});

export default App;
