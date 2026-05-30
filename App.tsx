import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { WebView } from "react-native-webview";

const APP_URL = "https://time-converter-woad-iota.vercel.app/";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-3012411444875177/8300847790";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={"white"}
      />
      <WebView source={{ uri: APP_URL }} style={styles.webview} />
      <View>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
          onAdLoaded={() => console.log("Ad loaded")}
          onAdFailedToLoad={(error) => console.error("Ad failed:", error)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
