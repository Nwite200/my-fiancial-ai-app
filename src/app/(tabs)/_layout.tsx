import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarLabel: 'Home' }} />
      <Tabs.Screen name="transactions" options={{ title: 'Transactions', tabBarLabel: 'Transactions' }} />
      <Tabs.Screen name="insights" options={{ title: 'AI Insights', tabBarLabel: 'AI Insights' }} />
      <Tabs.Screen name="goals" options={{ title: 'Goals', tabBarLabel: 'Goals' }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarLabel: 'More' }} />
    </Tabs>
  );
}
