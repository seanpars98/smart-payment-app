import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Search, UserPlus, X } from "lucide-react-native";
import { users } from "@/mocks/users";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types";
import Colors from "@/constants/colors";
import UserListItem from "@/components/UserListItem";

export default function ContactsScreen() {
  const router = useRouter();
  const { user: currentUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter out the current user and filter by search query
  const filteredUsers = users
    .filter((user) => user.id !== currentUser?.id)
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleUserPress = (user: User) => {
    router.push(`/profile/${user.id}`);
  };

  const renderRightComponent = (user: User) => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => router.push({
          pathname: "/send",
          params: { userId: user.id }
        })}
      >
        <Text style={styles.actionButtonText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.requestButton]}
        onPress={() => router.push({
          pathname: "/request",
          params: { userId: user.id }
        })}
      >
        <Text style={styles.actionButtonText}>Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or username"
          placeholderTextColor={Colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <X size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.addContactContainer}>
        <TouchableOpacity style={styles.addContactButton}>
          <UserPlus size={20} color={Colors.primary} />
          <Text style={styles.addContactText}>Add New Contact</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <UserListItem
            user={item}
            onPress={handleUserPress}
            rightComponent={renderRightComponent(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No contacts found</Text>
            <Text style={styles.emptySubtext}>
              Try a different search or add new contacts
            </Text>
          </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    margin: 16,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.text,
  },
  addContactContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addContactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(74, 144, 226, 0.1)",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(74, 144, 226, 0.3)",
  },
  addContactText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary,
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
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  requestButton: {
    backgroundColor: Colors.secondary,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 12,
  },
});