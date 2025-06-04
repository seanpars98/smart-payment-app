import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Currency } from '@/types';
import BalanceCard from './BalanceCard';
import { useWalletStore } from '@/store/walletStore';
import Colors from '@/constants/colors';

const CurrencySelector: React.FC = () => {
  const { balances, selectedCurrency, setSelectedCurrency } = useWalletStore();

  if (balances.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Balances</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {balances.map((balance) => (
          <BalanceCard
            key={balance.currency}
            currency={balance.currency}
            balance={balance.amount}
            isSelected={selectedCurrency === balance.currency}
            onPress={() => setSelectedCurrency(balance.currency)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 16,
    color: Colors.text,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});

export default CurrencySelector;