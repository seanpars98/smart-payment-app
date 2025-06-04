import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowUpRight, ArrowDownLeft, DollarSign, CreditCard } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, color, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.actionButton}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const ActionButtons: React.FC = () => {
  const router = useRouter();

  const actions = [
    {
      icon: <ArrowUpRight size={24} color="#FFFFFF" />,
      label: 'Send',
      color: Colors.primary,
      onPress: () => router.push('/send'),
    },
    {
      icon: <ArrowDownLeft size={24} color="#FFFFFF" />,
      label: 'Request',
      color: Colors.secondary,
      onPress: () => router.push('/request'),
    },
    {
      icon: <DollarSign size={24} color="#FFFFFF" />,
      label: 'Deposit',
      color: Colors.success,
      onPress: () => router.push('/deposit'),
    },
    {
      icon: <CreditCard size={24} color="#FFFFFF" />,
      label: 'Withdraw',
      color: Colors.info,
      onPress: () => router.push('/withdraw'),
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <ActionButton
          key={index}
          icon={action.icon}
          label={action.label}
          color={action.color}
          onPress={action.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
});

export default ActionButtons;