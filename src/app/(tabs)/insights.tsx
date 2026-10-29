import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';

export default function Insights() {
  const [tab, setTab] = useState<'weekly' | 'monthly'>('weekly');
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.tabs}>
        <Text onPress={() => setTab('weekly')} style={[styles.tab, tab === 'weekly' && styles.tabActive]}>Weekly</Text>
        <Text onPress={() => setTab('monthly')} style={[styles.tab, tab === 'monthly' && styles.tabActive]}>Monthly</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{tab === 'weekly' ? 'Weekly' : 'Monthly'} Summary</Text>
        <Text>Income: ₦500,000.00</Text>
        <Text>Expenses: ₦155,000.00</Text>
        <Text>Net: ₦345,000.00</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>AI Insight</Text>
        <Text>"Your food spending increased by 18% compared with last week. Consider setting a weekly food budget." (demo)</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Ask AI</Text>
        <Text style={styles.muted}>Chat interface placeholder. AI uses only authorised aggregated metrics.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8' },
  tabs: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  tab: { padding: 8, color: '#6B7280' },
  tabActive: { color: '#0B3D2E', fontWeight: '700' },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  title: { fontWeight: '600', color: '#0B3D2E', marginBottom: 8 },
  muted: { color: '#9CA3AF', fontSize: 12 },
});
