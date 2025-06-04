import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Currency } from '@/types';
import Colors from '@/constants/colors';
import CurrencyBadge from './CurrencyBadge';

type BalanceCardProps = {
  currency: Currency;
  balance: number;
  onPress?: () => void;
  isSelected?: boolean;
};

const BalanceCard: React.FC<BalanceCardProps> = ({ 
  currency, 
  balance, 
  onPress,
  isSelected = false,
}) => {
  
  const getGradientColors = () => {
    switch (currency) {
      case 'USD':
        return ['#4A90E2', '#63B3ED'];
      case 'USDT':
        return ['#10B981', '#34D399'];
      case 'USDC':
        return ['#3B82F6', '#60A5FA'];
      default:
        return ['#4A90E2', '#63B3ED'];
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, isSelected && styles.selected]}>
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <CurrencyBadge currency={currency} size="large" />
          <Text style={styles.currencyName}>{currency}</Text>
        </View>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceAmount}>
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: 8,
    width: 200,
    height: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  selected: {
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  gradient: {
    borderRadius: 16,
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  balanceContainer: {
    marginTop: 16,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default BalanceCard;