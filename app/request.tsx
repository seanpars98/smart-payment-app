import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Search } from "lucide-react-native";
import { useWalletStore } from "@/store/walletStore";
import { users } from "@/mocks/users";
import { User } from "@/types";
import Colors from "@/constants/colors";
import AmountInput from "@/components/AmountInput";
import Button from "@/components/Button";
import UserListItem from "@/components/UserListItem";

export default function RequestMoneyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { userId } = params;
  
  const { selectedCurrency, addTransaction } = useWalletStore();
  
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (userId) {
      const user = users.find(u => u.id === userId);
      if (user) {
        setSelectedUser(user);
      }
    }
  }, [userId]);
  
  const filteredUsers = users.filter(
    (user) =>
      user.id !== "user-1" && // Exclude current user
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSearchQuery("");
  };
  
  const handleRequest = async () => {
    if (!selectedUser) {
      Alert.alert("Error", "Please select a recipient");
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
        type: "request",
        amount: amountValue,
        currency: selectedCurrency,
        sender: selectedUser,
        recipient: users[0], // Current user
        status: "pending",
        note: note.trim() || undefined,
      });
      
      Alert.alert(
        "Request Sent",
        `You've successfully requested $${amountValue.toFixed(2)} ${selectedCurrency} from ${selectedUser.name}`,
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send request. Please try again.");
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
          <View style={styles.recipientSection}>
            <Text style={styles.sectionTitle}>Request From</Text>
            
            {selectedUser ? (
              <View style={styles.selectedUserContainer}>
                <UserListItem
                  user={selectedUser}
                  subtitle="Selected User"
                />
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => setSelectedUser(null)}
                >
                  <Text style={styles.changeButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View style={styles.searchContainer}>
                  <Search size={20} color={Colors.textSecondary} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or username"
                    placeholderTextColor={Colors.textLight}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
                
                {searchQuery.length > 0 && (
                  <View style={styles.searchResults}>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TouchableOpacity
                          key={user.id}
                          style={styles.userItem}
                          onPress={() => handleUserSelect(user)}
                        >
                          <Text style={styles.userName}>{user.name}</Text>
                          <Text style={styles.userUsername}>@{user.username}</Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text style={styles.noResults}>No users found</Text>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
          
          <View style={styles.amountSection}>
            <AmountInput
              value={amount}
              onChangeValue={setAmount}
              currency={selectedCurrency}
              label="Amount"
              placeholder="0.00"
            />
          </View>
          
          <View style={styles.noteSection}>
            <Text style={styles.label}>Note (Optional)</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="What's this for?"
              placeholderTextColor={Colors.textLight}
              value={note}
              onChangeText={setNote}
              multiline
              maxLength={100}
            />
          </View>
          
          <Button
            title="Request Money"
            onPress={handleRequest}
            loading={isLoading}
            disabled={!selectedUser || !amount || parseFloat(amount) <= 0}
            style={styles.requestButton}
          />
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
  recipientSection: {
    marginBottom: 24,
  },
  amountSection: {
    marginBottom: 24,
  },
  noteSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.text,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.text,
  },
  searchResults: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  userUsername: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  noResults: {
    padding: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  selectedUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  changeButton: {
    paddingHorizontal: 12,
  },
  changeButtonText: {
    color: Colors.secondary,
    fontWeight: "500",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: Colors.text,
  },
  noteInput: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 80,
    textAlignVertical: "top",
  },
  requestButton: {
    marginTop: 16,
    backgroundColor: Colors.secondary,
  },
});