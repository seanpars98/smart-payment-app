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
import { Share2, Copy, ArrowUpRight, ArrowDownLeft } from "lucide-react-native";
import { useWalletStore } from "@/store/walletStore";
import Colors from "@/constants/colors";
import Button from "@/components/Button";
import CurrencyBadge from "@/components/CurrencyBadge";

export default function TransactionDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { transactions } = useWalletStore();
  
  const transaction = transactions.find((t) => t.id === id);
  
  if (!transaction) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Transaction not found</Text>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          style={styles.backButton}
        />
      </View>
    );
  }
  
  const {
    type,
    amount,
    currency,
    sender,
    recipient,
    status,
    note,
    timestamp,
  } = transaction;
  
  const isOutgoing = type === "send" || type === "withdraw";
  const isIncoming = type === "request" || type === "deposit";
  
  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return Colors.success;
      case "pending":
        return Colors.warning;
      case "failed":
        return Colors.error;
      default:
        return Colors.textLight;
    }
  };
  
  const getTypeLabel = () => {
    switch (type) {
      case "send":
        return "Sent to";
      case "request":
        return "Requested from";
      case "deposit":
        return "Deposited to";
      case "withdraw":
        return "Withdrawn to";
      default:
        return "";
    }
  };
  
  const getDisplayName = () => {
    if (type === "send") {
      return recipient.name;
    } else if (type === "request") {
      return sender.name;
    } else if (type === "deposit" || type === "withdraw") {
      return "Bank Account";
    }
    return "";
  };
  
  const getAvatar = () => {
    if (type === "send") {
      return recipient.avatar;
    } else if (type === "request") {
      return sender.avatar;
    }
    return undefined;
  };
  
  const handleShare = () => {
    Alert.alert("Share", "Sharing functionality would be implemented here");
  };
  
  const handleCopy = () => {
    Alert.alert("Copied", "Transaction ID copied to clipboard");
  };
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {isOutgoing ? (
            <ArrowUpRight size={32} color="#FFFFFF" />
          ) : (
            <ArrowDownLeft size={32} color="#FFFFFF" />
          )}
        </View>
        
        <Text style={styles.amountText}>
          {isOutgoing ? "-" : "+"}${amount.toFixed(2)}
        </Text>
        
        <View style={styles.currencyContainer}>
          <CurrencyBadge currency={currency} size="small" />
          <Text style={styles.currencyText}>{currency}</Text>
        </View>
        
        <Text style={styles.statusText}>
          Status: <Text style={{ color: getStatusColor() }}>{status}</Text>
        </Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.userSection}>
          <View style={styles.userContainer}>
            {getAvatar() ? (
              <Image source={{ uri: getAvatar() }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholderAvatar]}>
                <Text style={styles.placeholderText}>
                  {getDisplayName().charAt(0)}
                </Text>
              </View>
            )}
            
            <View style={styles.userInfo}>
              <Text style={styles.typeLabel}>{getTypeLabel()}</Text>
              <Text style={styles.userName}>{getDisplayName()}</Text>
              {type !== "deposit" && type !== "withdraw" && (
                <Text style={styles.userUsername}>
                  @{type === "send" ? recipient.username : sender.username}
                </Text>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>
              {new Date(timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>
              {new Date(timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Transaction ID</Text>
            <View style={styles.transactionIdContainer}>
              <Text style={styles.infoValue} numberOfLines={1}>
                {transaction.id}
              </Text>
              <TouchableOpacity onPress={handleCopy}>
                <Copy size={16} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          {note && (
            <View style={styles.noteContainer}>
              <Text style={styles.noteLabel}>Note</Text>
              <Text style={styles.noteText}>{note}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionsContainer}>
          <Button
            title="Share Receipt"
            variant="outline"
            onPress={handleShare}
            style={styles.shareButton}
            textStyle={styles.shareButtonText}
            icon={<Share2 size={18} color={Colors.primary} style={{ marginRight: 8 }} />}
          />
          
          {status === "pending" && type === "request" && (
            <View style={styles.pendingActionsContainer}>
              <Button
                title="Pay Now"
                style={styles.payButton}
              />
              <Button
                title="Decline"
                variant="outline"
                style={styles.declineButton}
                textStyle={styles.declineButtonText}
              />
            </View>
          )}
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
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  amountText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  currencyText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 8,
  },
  statusText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  detailsContainer: {
    padding: 16,
  },
  userSection: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  placeholderAvatar: {
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  userInfo: {
    marginLeft: 16,
  },
  typeLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  userUsername: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoSection: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
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
  transactionIdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  noteContainer: {
    marginTop: 16,
  },
  noteLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  actionsContainer: {
    marginTop: 8,
  },
  shareButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  shareButtonText: {
    marginLeft: 8,
  },
  pendingActionsContainer: {
    marginTop: 16,
  },
  payButton: {
    marginBottom: 12,
  },
  declineButton: {
    borderColor: Colors.error,
  },
  declineButtonText: {
    color: Colors.error,
  },
});