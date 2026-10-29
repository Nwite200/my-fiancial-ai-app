import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Goals() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
        <Text style={styles.title}>Emergency Fund</Text>
        <Text>Target: ₦1,000,000 • Progress: 45%</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Rent</Text>
        <Text>Target: ₦600,000 • Progress: 80%</Text>
      </View>
      <Text style={styles.note}>Demo data. Create/edit/delete goals supported in full build.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8' },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  title: { fontWeight: '600', color: '#0B3D2E', marginBottom: 4 },
  note: { marginTop: 16, fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});
