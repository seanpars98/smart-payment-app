import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { User } from '@/types';
import Colors from '@/constants/colors';

type UserListItemProps = {
  user: User;
  onPress?: (user: User) => void;
  subtitle?: string;
  rightComponent?: React.ReactNode;
};

const UserListItem: React.FC<UserListItemProps> = ({ 
  user, 
  onPress, 
  subtitle,
  rightComponent 
}) => {
  return (
    <TouchableOpacity 
      onPress={() => onPress && onPress(user)}
      disabled={!onPress}
      style={styles.container}
    >
      {user.avatar ? (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.placeholderAvatar]}>
          <Text style={styles.placeholderText}>
            {user.name.charAt(0)}
          </Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>
          {subtitle || `@${user.username}`}
        </Text>
      </View>
      
      {rightComponent && (
        <View style={styles.rightContainer}>
          {rightComponent}
        </View>
      )}
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
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  rightContainer: {
    marginLeft: 8,
  },
});

export default UserListItem;