import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Currency } from '@/types';
import Colors from '@/constants/colors';

type CurrencyBadgeProps = {
  currency: Currency;
  size?: 'small' | 'medium' | 'large';
};

const CurrencyBadge: React.FC<CurrencyBadgeProps> = ({ currency, size = 'medium' }) => {
  const getColor = () => {
    switch (currency) {
      case 'USD':
        return '#4A90E2';
      case 'USDT':
        return '#10B981';
      case 'USDC':
        return '#3B82F6';
      default:
        return Colors.primary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { width: 24, height: 24, borderRadius: 12 };
      case 'large':
        return { width: 40, height: 40, borderRadius: 20 };
      default:
        return { width: 32, height: 32, borderRadius: 16 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return { fontSize: 10 };
      case 'large':
        return { fontSize: 16 };
      default:
        return { fontSize: 12 };
    }
  };

  return (
    <View style={[styles.badge, getSizeStyle(), { backgroundColor: getColor() }]}>
      <Text style={[styles.text, getTextSize()]}>
        {currency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CurrencyBadge;