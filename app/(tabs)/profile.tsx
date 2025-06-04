import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import {
  LogOut,
  Settings,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
} from "lucide-react-native";
import { useAuthStore } from "@/store/authStore";
import Colors from "@/constants/colors";
import Button from "@/components/Button";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          {icon}
          <Text style={styles.menuItemTitle}>{title}</Text>
        </View>
        <ChevronRight size={20} color={Colors.textLight} />
      </View>
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => logout(),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const menuItems = [
    {
      icon: <Settings size={24} color={Colors.text} />,
      title: "Account Settings",
      onPress: () => {},
    },
    {
      icon: <CreditCard size={24} color={Colors.text} />,
      title: "Payment Methods",
      onPress: () => {},
    },
    {
      icon: <Bell size={24} color={Colors.text} />,
      title: "Notifications",
      onPress: () => {},
    },
    {
      icon: <Shield size={24} color={Colors.text} />,
      title: "Privacy & Security",
      onPress: () => {},
    },
    {
      icon: <HelpCircle size={24} color={Colors.text} />,
      title: "Help & Support",
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.profileContainer}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0) || "U"}
              </Text>
            </View>
          )}

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.username}>@{user?.username}</Text>
            {user?.walletAddress && (
              <Text style={styles.walletAddress} numberOfLines={1}>
                {user.walletAddress.substring(0, 8)}...
                {user.walletAddress.substring(user.walletAddress.length - 6)}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title="Edit Profile"
            variant="outline"
            style={styles.editButton}
          />
          <Button
            title="Logout"
            variant="ghost"
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
            onPress={handleLogout}
            icon={<LogOut size={18} color={Colors.error} />}
          />
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            onPress={item.onPress}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.copyright}>
          © 2025 PayFlow. All rights reserved.
        </Text>
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
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 4,
  },
  walletAddress: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    marginRight: 8,
    borderColor: "#FFFFFF",
  },
  logoutButton: {
    backgroundColor: "transparent",
  },
  logoutButtonText: {
    color: Colors.error,
  },
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    borderRadius: 8,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 16,
    marginLeft: 16,
    color: Colors.text,
  },
  footer: {
    marginTop: 40,
    marginBottom: 24,
    alignItems: "center",
  },
  version: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: Colors.textLight,
  },
});