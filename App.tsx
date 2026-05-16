import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { WebView } from "react-native-webview";

const APP_URL = "https://time-converter-woad-iota.vercel.app/";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={"white"}
      />
      <WebView source={{ uri: APP_URL }} style={styles.webview} />
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
