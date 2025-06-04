import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowUpRight, ArrowDownLeft, Plus, Minus } from "lucide-react-native";
import { useWalletStore } from "@/store/walletStore";
import { useBankStore } from "@/store/bankStore";
import Colors from "@/constants/colors";
import BalanceCard from "@/components/BalanceCard";
import Button from "@/components/Button";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  color: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onPress, color }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.actionButton}
    >
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        {icon}
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function WalletScreen() {
  const router = useRouter();
  const { balances, selectedCurrency, setSelectedCurrency } = useWalletStore();
  const { bankAccounts } = useBankStore();

  const totalBalance = balances.reduce((sum, balance) => sum + balance.amount, 0);

  const actions = [
    {
      icon: <ArrowUpRight size={20} color="#FFFFFF" />,
      label: "Send",
      onPress: () => router.push("/send"),
      color: Colors.primary,
    },
    {
      icon: <ArrowDownLeft size={20} color="#FFFFFF" />,
      label: "Request",
      onPress: () => router.push("/request"),
      color: Colors.secondary,
    },
    {
      icon: <Plus size={20} color="#FFFFFF" />,
      label: "Deposit",
      onPress: () => router.push("/deposit"),
      color: Colors.success,
    },
    {
      icon: <Minus size={20} color="#FFFFFF" />,
      label: "Withdraw",
      onPress: () => router.push("/withdraw"),
      color: Colors.info,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.totalBalanceLabel}>Total Balance</Text>
        <Text style={styles.totalBalanceAmount}>
          ${totalBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <ActionButton
            key={index}
            icon={action.icon}
            label={action.label}
            onPress={action.onPress}
            color={action.color}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Balances</Text>
        <View style={styles.balancesContainer}>
          {balances.map((balance) => (
            <View key={balance.currency} style={styles.balanceCardWrapper}>
              <BalanceCard
                currency={balance.currency}
                balance={balance.amount}
                isSelected={selectedCurrency === balance.currency}
                onPress={() => setSelectedCurrency(balance.currency)}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Linked Bank Accounts</Text>
        {bankAccounts.length > 0 ? (
          bankAccounts.map((account) => (
            <View key={account.id} style={styles.bankAccountCard}>
              <View>
                <Text style={styles.bankName}>{account.name}</Text>
                <Text style={styles.accountNumber}>{account.accountNumber}</Text>
                <View style={styles.accountTypeContainer}>
                  <Text style={styles.accountType}>
                    {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                  </Text>
                  {account.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyBankContainer}>
            <Text style={styles.emptyBankText}>No bank accounts linked</Text>
            <Button
              title="Link a Bank Account"
              variant="outline"
              size="small"
              style={styles.linkBankButton}
              onPress={() => router.push("/deposit")}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  totalBalanceLabel: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
  },
  totalBalanceAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: -20,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: "center",
    width: "22%",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.text,
  },
  balancesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  balanceCardWrapper: {
    width: "50%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  bankAccountCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bankName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  accountTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountType: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  defaultBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  defaultText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyBankContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyBankText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  linkBankButton: {
    minWidth: 180,
  },
});