import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Transaction } from '@/types';
import Colors from '@/constants/colors';
import CurrencyBadge from './CurrencyBadge';
import { formatDistanceToNow } from '@/utils/date';

type TransactionItemProps = {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  const { type, amount, currency, sender, recipient, status, note, timestamp } = transaction;
  
  const isOutgoing = type === 'send' || type === 'withdraw';
  const isIncoming = type === 'request' || type === 'deposit';
  
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return Colors.success;
      case 'pending':
        return Colors.warning;
      case 'failed':
        return Colors.error;
      default:
        return Colors.textLight;
    }
  };
  
  const getTypeLabel = () => {
    switch (type) {
      case 'send':
        return 'Sent to';
      case 'request':
        return 'Requested from';
      case 'deposit':
        return 'Deposited to';
      case 'withdraw':
        return 'Withdrawn to';
      default:
        return '';
    }
  };
  
  const getDisplayName = () => {
    if (type === 'send') {
      return recipient.name;
    } else if (type === 'request') {
      return sender.name;
    } else if (type === 'deposit' || type === 'withdraw') {
      return 'Bank Account';
    }
    return '';
  };
  
  const getAvatar = () => {
    if (type === 'send') {
      return recipient.avatar;
    } else if (type === 'request') {
      return sender.avatar;
    }
    return undefined;
  };

  return (
    <TouchableOpacity 
      onPress={() => onPress && onPress(transaction)}
      style={styles.container}
    >
      <View style={styles.avatarContainer}>
        {getAvatar() ? (
          <Image source={{ uri: getAvatar() }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Text style={styles.placeholderText}>
              {getDisplayName().charAt(0)}
            </Text>
          </View>
        )}
        <CurrencyBadge currency={currency} size="small" />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{getDisplayName()}</Text>
          <Text style={[styles.amount, isOutgoing ? styles.negative : styles.positive]}>
            {isOutgoing ? '-' : '+'}{amount.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.type}>
            {getTypeLabel()} • <Text style={{ color: getStatusColor() }}>{status}</Text>
          </Text>
          <Text style={styles.time}>{formatDistanceToNow(timestamp)}</Text>
        </View>
        
        {note && (
          <Text style={styles.note} numberOfLines={1}>
            {note}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  placeholderAvatar: {
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  positive: {
    color: Colors.success,
  },
  negative: {
    color: Colors.error,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  time: {
    fontSize: 12,
    color: Colors.textLight,
  },
  note: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});

export default TransactionItem;