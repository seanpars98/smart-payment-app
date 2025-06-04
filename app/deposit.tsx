import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CreditCard, Plus } from "lucide-react-native";
import { useWalletStore } from "@/store/walletStore";
import { useBankStore } from "@/store/bankStore";
import Colors from "@/constants/colors";
import AmountInput from "@/components/AmountInput";
import Button from "@/components/Button";

export default function DepositScreen() {
  const router = useRouter();
  const { selectedCurrency, addTransaction } = useWalletStore();
  const { bankAccounts } = useBankStore();
  
  const [amount, setAmount] = useState("");
  const [selectedBankId, setSelectedBankId] = useState<string | null>(
    bankAccounts.length > 0 ? bankAccounts[0].id : null
  );
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDeposit = async () => {
    if (!selectedBankId) {
      Alert.alert("Error", "Please select a bank account");
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }
    
    const amountValue = parseFloat(amount);
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      addTransaction({
        type: "deposit",
        amount: amountValue,
        currency: selectedCurrency,
        sender: { id: "bank", name: "Bank Account", username: "", email: "" },
        recipient: { id: "user-1", name: "John Doe", username: "johndoe", email: "john@example.com" },
        status: "completed",
      });
      
      Alert.alert(
        "Deposit Successful",
        `You've successfully deposited $${amountValue.toFixed(2)} ${selectedCurrency} to your account`,
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to process deposit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
    >
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <View style={styles.bankSection}>
            <Text style={styles.sectionTitle}>From Bank Account</Text>
            
            {bankAccounts.length > 0 ? (
              <View style={styles.bankAccountsContainer}>
                {bankAccounts.map((account) => (
                  <TouchableOpacity
                    key={account.id}
                    style={[
                      styles.bankAccountItem,
                      selectedBankId === account.id && styles.selectedBankAccount,
                    ]}
                    onPress={() => setSelectedBankId(account.id)}
                  >
                    <CreditCard
                      size={24}
                      color={
                        selectedBankId === account.id
                          ? Colors.primary
                          : Colors.textSecondary
                      }
                    />
                    <View style={styles.bankAccountInfo}>
                      <Text style={styles.bankName}>{account.name}</Text>
                      <Text style={styles.accountNumber}>
                        {account.accountNumber}
                      </Text>
                    </View>
                    {account.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity style={styles.addBankButton}>
                  <Plus size={20} color={Colors.primary} />
                  <Text style={styles.addBankText}>Add New Bank Account</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.noBankContainer}>
                <Text style={styles.noBankText}>
                  No bank accounts linked yet
                </Text>
                <Button
                  title="Add Bank Account"
                  variant="outline"
                  size="small"
                  style={styles.addBankButtonEmpty}
                />
              </View>
            )}
          </View>
          
          <View style={styles.amountSection}>
            <AmountInput
              value={amount}
              onChangeValue={setAmount}
              currency={selectedCurrency}
              label="Amount to Deposit"
              placeholder="0.00"
            />
            
            <View style={styles.feeContainer}>
              <Text style={styles.feeText}>
                Fee: <Text style={styles.feeAmount}>$0.00</Text>
              </Text>
              <Text style={styles.processingTime}>
                Processing Time: 1-3 business days
              </Text>
            </View>
          </View>
          
          <Button
            title="Deposit Funds"
            onPress={handleDeposit}
            loading={isLoading}
            disabled={!selectedBankId || !amount || parseFloat(amount) <= 0}
            style={styles.depositButton}
          />
          
          <Text style={styles.disclaimer}>
            By proceeding, you agree to our Terms of Service and authorize
            CryptoVenmo to debit your bank account for the amount specified
            above.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  formContainer: {
    flex: 1,
  },
  bankSection: {
    marginBottom: 24,
  },
  amountSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.text,
  },
  bankAccountsContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  bankAccountItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
    borderRadius: 8,
  },
  selectedBankAccount: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  bankAccountInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  defaultBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  addBankButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "rgba(108, 99, 255, 0.1)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(108, 99, 255, 0.3)",
    borderStyle: "dashed",
  },
  addBankText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary,
  },
  noBankContainer: {
    padding: 24,
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  noBankText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  addBankButtonEmpty: {
    minWidth: 180,
  },
  feeContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 8,
  },
  feeText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  feeAmount: {
    fontWeight: "500",
  },
  processingTime: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  depositButton: {
    marginBottom: 16,
    backgroundColor: Colors.success,
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: "center",
    marginTop: 16,
  },
});