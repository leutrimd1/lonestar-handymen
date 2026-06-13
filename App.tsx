import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Logo from './assets/lonestar-handyman.svg';

async function openCamera() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    console.log('Camera permission denied');
    return;
  }
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ['images'],
    quality: 1,
  });
  if (!result.canceled) {
    console.log('Quote photo captured:', result.assets[0]);
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Logo width={220} height={220} style={styles.logo} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL('tel:+16825589208')}
        activeOpacity={0.8}
      >
        <Ionicons name="call" size={22} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Call</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.quoteButton]}
        onPress={openCamera}
        activeOpacity={0.8}
      >
        <Ionicons name="camera" size={22} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Quote</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    marginBottom: 48,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C2A5D',
    borderRadius: 8,
    paddingVertical: 14,
    width: '100%',
    marginBottom: 16,
  },
  quoteButton: {
    backgroundColor: '#CA0720',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
