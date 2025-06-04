import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useWalletStore } from "@/store/walletStore";
import { useAuthStore } from "@/store/authStore";
import { Transaction } from "@/types";
import Colors from "@/constants/colors";
import CurrencySelector from "@/components/CurrencySelector";
import ActionButtons from "@/components/ActionButtons";
import TransactionItem from "@/components/TransactionItem";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { transactions, fetchTransactions, isLoading } = useWalletStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure we have transactions data
    fetchTransactions().then(() => {
      setIsReady(true);
    });
  }, []);

  const handleTransactionPress = (transaction: Transaction) => {
    router.push(`/transaction/${transaction.id}`);
  };

  const renderHeader = () => (
    <View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Hello, {user?.name?.split(" ")[0] || "User"}
        </Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      <CurrencySelector />
      <ActionButtons />

      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Recent Activity</Text>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No transactions yet</Text>
      <Text style={styles.emptySubtext}>
        Your transaction history will appear here
      </Text>
    </View>
  );

  // If not ready, show a loading placeholder
  if (!isReady && transactions.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Hello, {user?.name?.split(" ")[0] || "User"}
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your transactions...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={handleTransactionPress}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchTransactions}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  welcomeContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});