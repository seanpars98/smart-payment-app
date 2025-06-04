import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Copy, ArrowUpRight, ArrowDownLeft } from "lucide-react-native";
import { users } from "@/mocks/users";
import Colors from "@/constants/colors";
import Button from "@/components/Button";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const user = users.find((u) => u.id === id);
  
  if (!user) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>User not found</Text>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          style={styles.backButton}
        />
      </View>
    );
  }
  
  const handleSendMoney = () => {
    router.push({
      pathname: "/send",
      params: { userId: user.id }
    });
  };
  
  const handleRequestMoney = () => {
    router.push({
      pathname: "/request",
      params: { userId: user.id }
    });
  };
  
  const handleCopyWalletAddress = () => {
    if (user.walletAddress) {
      Alert.alert("Copied", "Wallet address copied to clipboard");
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Text style={styles.placeholderText}>{user.name.charAt(0)}</Text>
          </View>
        )}
        
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        
        {user.walletAddress && (
          <TouchableOpacity
            style={styles.walletAddressContainer}
            onPress={handleCopyWalletAddress}
          >
            <Text style={styles.walletAddress} numberOfLines={1}>
              {user.walletAddress.substring(0, 8)}...
              {user.walletAddress.substring(user.walletAddress.length - 6)}
            </Text>
            <Copy size={16} color="rgba(255, 255, 255, 0.8)" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSendMoney}
        >
          <View style={[styles.actionIcon, { backgroundColor: Colors.primary }]}>
            <ArrowUpRight size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.actionText}>Send Money</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleRequestMoney}
        >
          <View style={[styles.actionIcon, { backgroundColor: Colors.secondary }]}>
            <ArrowDownLeft size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.actionText}>Request Money</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Contact Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          
          {user.walletAddress && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Wallet Address</Text>
              <View style={styles.walletInfoContainer}>
                <Text style={styles.infoValue} numberOfLines={1}>
                  {user.walletAddress.substring(0, 10)}...
                </Text>
                <TouchableOpacity onPress={handleCopyWalletAddress}>
                  <Copy size={16} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        
        <View style={styles.transactionHistoryContainer}>
          <Text style={styles.transactionHistoryTitle}>
            Transaction History
          </Text>
          <Text style={styles.emptyTransactionText}>
            No recent transactions with this user
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  backButton: {
    minWidth: 120,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginBottom: 16,
  },
  placeholderAvatar: {
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
  },
  walletAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  walletAddress: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginRight: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: -20,
    marginBottom: 16,
  },
  actionButton: {
    alignItems: "center",
    width: "40%",
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  infoContainer: {
    padding: 16,
  },
  infoSection: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.text,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    maxWidth: "60%",
  },
  walletInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionHistoryContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  transactionHistoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.text,
  },
  emptyTransactionText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingVertical: 24,
  },
});