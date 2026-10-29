import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function More() {
  const items = ['Settings & Privacy', 'Data Sources', 'Export Data', 'Delete Data', 'Theme: Light/Dark', 'Currency: NGN'];
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {items.map((i) => (
        <View key={i} style={styles.row}>
          <Text>{i}</Text>
        </View>
      ))}
      <Text style={styles.note}>Platform-specific permission & privacy controls in full build.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8' },
  row: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, marginBottom: 8 },
  note: { marginTop: 16, fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});
