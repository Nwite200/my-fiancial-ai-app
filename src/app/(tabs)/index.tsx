import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { incomeTotal, expenseTotal, netCashFlow } from '../../lib/finance/calc';

const demo = [
  { id: '1', amountMinor: 50000000, currency: 'NGN', direction: 'credit' as const, category: 'salary', timestamp: Date.now() },
  { id: '2', amountMinor: 1200000, currency: 'NGN', direction: 'debit' as const, category: 'food', timestamp: Date.now() },
  { id: '3', amountMinor: 350000, currency: 'NGN', direction: 'debit' as const, category: 'transport', timestamp: Date.now() },
];

function naira(minor: number) {
  return '₦' + (minor / 100).toLocaleString('en-NG');
}

export default function Home() {
  const income = incomeTotal(demo);
  const expense = expenseTotal(demo);
  const net = netCashFlow(demo);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.greeting}>Good morning 👋</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Total Income</Text>
        <Text style={styles.value}>{naira(income)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Total Expenses</Text>
        <Text style={styles.value}>{naira(expense)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Net Cash Flow</Text>
        <Text style={styles.value}>{naira(net)}</Text>
      </View>
      <Text style={styles.section}>Recent Transactions (demo data)</Text>
      {demo.map((t) => (
        <View key={t.id} style={styles.tx}>
          <Text>{t.category}</Text>
          <Text style={{ color: t.direction === 'credit' ? 'green' : 'red' }}>
            {t.direction === 'credit' ? '+' : '-'}{naira(t.amountMinor)}
          </Text>
        </View>
      ))}
      <Text style={styles.note}>Demo mode: realistic Nigerian naira sample data. Connect sources to see real data.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8' },
  greeting: { fontSize: 22, fontWeight: '700', color: '#0B3D2E', marginBottom: 16 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  label: { color: '#6B7280', fontSize: 12 },
  value: { fontSize: 20, fontWeight: '700', color: '#1F2937', marginTop: 4 },
  section: { marginTop: 16, fontWeight: '600', color: '#0B3D2E' },
  tx: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#FFF', borderRadius: 8, marginTop: 8 },
  note: { marginTop: 24, fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});
