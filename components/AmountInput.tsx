import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Currency } from '@/types';
import Colors from '@/constants/colors';
import CurrencyBadge from './CurrencyBadge';

type AmountInputProps = {
  value: string;
  onChangeValue: (value: string) => void;
  currency: Currency;
  label?: string;
  placeholder?: string;
  error?: string;
};

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChangeValue,
  currency,
  label = 'Amount',
  placeholder = '0.00',
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    // Only allow numbers and a single decimal point
    const filtered = text.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = filtered.split('.');
    if (parts.length > 2) {
      return;
    }
    
    onChangeValue(filtered);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError
        ]}
      >
        <Text style={styles.currencySymbol}>$</Text>
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textLight}
          keyboardType="decimal-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        <CurrencyBadge currency={currency} size="small" />
      </View>
      
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: Colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 56,
    backgroundColor: Colors.background,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: Colors.error,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.text,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: Colors.text,
    height: '100%',
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginTop: 4,
  },
});

export default AmountInput;