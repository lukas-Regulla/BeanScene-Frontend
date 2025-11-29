import { StyleSheet } from "react-native";


// Color palette
export const Colors = {
  primary: "#4e342e",
  primaryDark: "#3e2723",
  primaryLight: "#6d4c41",
  red: "#d32f2f",
  accent: "#d7ccc8",
  accentDark: "#8d6e63",
  accentLight: "#efebe9",
  background: "#faf4ef",
  white: "#fff",
  text: "#4e342e",
  textDark: "#3e2723",
  textLight: "#6d4c41",
  textMuted: "#8d6e63",
  border: "#d7ccc8",
  error: "red",
  success: "#4caf50",
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 15,
  xl: 20,
  xxl: 25,
  xxxl: 30,
};

// Typography
export const Typography = {
  largeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.textDark,
  },
  sectionHeader: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5d4037",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: Spacing.xl,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textLight,
    marginTop: Spacing.sm,
    interlineHeight: 22,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
    marginTop: Spacing.sm,
    interlineHeight: 22,
    lineHeight: 24,
  },
  bodyMuted: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  small: {
    fontSize: 14,
    color: Colors.text,
  },
  smallMuted: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
};

// Reusable component styles
export const ComponentStyles = StyleSheet.create({
  // Containers
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  card: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    elevation: 3,
  },
  section: {
    marginVertical: Spacing.xl,
  },

  // Images
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  fullWidthImage: {
    width: "100%",
    aspectRatio: 2.6,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: Spacing.xl,
  },

  // Buttons
  button: {
    backgroundColor: Colors.primaryLight,
    padding: Spacing.md,
    borderRadius: 10,
    marginTop: Spacing.lg,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 18,
    flex: 1,
    alignItems: "center",
    minWidth: 110,
    marginHorizontal: Spacing.sm,
  },
  categoryButtonText: {
    color: Colors.text,
    fontWeight: "bold",
    flexShrink: 1,
  },
  smallButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  backButton: {
    fontSize: 18,
    color: Colors.text,
    paddingVertical: Spacing.sm,
  },
  logoutButton: {
    fontSize: 18,
    color: Colors.red,
    paddingVertical: Spacing.sm,
  },

  // Text inputs
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 16,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clearButton: {
    marginLeft: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  clearButtonText: {
    color: Colors.text,
    fontWeight: "600",
  },

  // Tags
  tag: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    marginRight: Spacing.md,
    marginBottom: Spacing.md,
  },
  tagText: {
    color: Colors.text,
    fontSize: 14,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: Spacing.lg,
  },

  // Cart/Mini-cart
  miniCart: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 260,
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderLeftWidth: 2,
    borderLeftColor: Colors.border,
  },
  miniCartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: Spacing.lg,
  },
  miniCartItem: {
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  cartCloseButton: {
    marginTop: Spacing.xxl,
    backgroundColor: Colors.primaryLight,
    color: Colors.white,
    padding: Spacing.md,
    textAlign: "center",
    borderRadius: 8,
    fontWeight: "bold",
  },

  // Overlay
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  // Empty states
  emptyText: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: "center",
    marginVertical: Spacing.lg,
  },

  // Row layouts
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },

  // Info boxes
  info: {
    marginLeft: Spacing.lg,
    justifyContent: "center",
  },
  priceText: {
    marginTop: Spacing.sm,
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: "bold",
  },
});

// Helper function to merge theme styles with custom overrides
export const mergeStyles = (baseStyle, overrides = {}) => {
  return { ...baseStyle, ...overrides };
};