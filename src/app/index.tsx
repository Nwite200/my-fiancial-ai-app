import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>My Financial AI</Text>
      <Text style={styles.tagline}>Your Money. Smarter.</Text>
      <Text style={styles.sub}>Track your spending, get AI insights, and build healthier financial habits.</Text>
      <Pressable style={styles.btn} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.btnText}>Get Started</Text>
      </Pressable>
      <Text style={styles.privacy}>Privacy-first. Core tracking works on-device without a bank account.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  logo: { fontSize: 28, fontWeight: '700', color: '#0B3D2E' },
  tagline: { fontSize: 16, color: '#0F766E', marginTop: 4 },
  sub: { textAlign: 'center', marginTop: 16, color: '#6B7280' },
  btn: { marginTop: 32, backgroundColor: '#0B3D2E', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  btnText: { color: '#FFF', fontWeight: '600' },
  privacy: { marginTop: 24, fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});
