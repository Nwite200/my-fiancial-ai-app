import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';

const demo = [
  { id: '1', amountMinor: 1200000, currency: 'NGN', direction: 'debit' as const, category: 'food', merchant: 'Shoprite', ts: '2026-10-28 14:20' },
  { id: '2', amountMinor: 50000000, currency: 'NGN', direction: 'credit' as const, category: 'salary', merchant: 'Employer', ts: '2026-10-25 09:00' },
];

function naira(minor: number) { return '₦' + (minor / 100).toLocaleString('en-NG'); }

export default function Transactions() {
  const [q, setQ] = useState('');
  const filtered = demo.filter((t) => t.merchant.toLowerCase().includes(q.toLowerCase()) || t.category.includes(q.toLowerCase()));
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <TextInput placeholder="Search transactions" value={q} onChangeText={setQ} style={styles.search} />
      {filtered.map((t) => (
        <View key={t.id} style={styles.tx}>
          <View>
            <Text style={styles.merchant}>{t.merchant}</Text>
            <Text style={styles.meta}>{t.category} • {t.ts}</Text>
          </View>
          <Text style={{ color: t.direction === 'credit' ? 'green' : 'red', fontWeight: '600' }}>
            {t.direction === 'credit' ? '+' : '-'}{naira(t.amountMinor)}
          </Text>
        </View>
      ))}
      <Text style={styles.note}>Demo data. Manual add/edit/delete coming via forms.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8' },
  search: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginBottom: 12 },
  tx: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#FFF', borderRadius: 8, marginBottom: 8 },
  merchant: { fontWeight: '600', color: '#1F2937' },
  meta: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  note: { marginTop: 16, fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
});
