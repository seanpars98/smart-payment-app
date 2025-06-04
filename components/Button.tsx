import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  View
} from 'react-native';
import Colors from '@/constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  ...props
}) => {
  
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: Colors.secondary,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: Colors.primary,
          borderWidth: 0,
        };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return Colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 12,
        };
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 10,
        };
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'small':
        return { fontSize: 14 };
      case 'large':
        return { fontSize: 18 };
      default:
        return { fontSize: 16 };
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      {...props}
    >
      <View
        style={[
          styles.button,
          getVariantStyle(),
          getSizeStyle(),
          disabled && styles.disabled,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} size="small" />
        ) : (
          <View style={styles.contentContainer}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text
              style={[
                styles.text,
                getTextSize(),
                { color: getTextColor() },
                disabled && styles.disabledText,
                textStyle,
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default Button;