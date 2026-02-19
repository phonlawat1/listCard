import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import I18n from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  fetchUsers,
  setSearchQuery,
  setCurrentPage,
  selectUser,
} from "../../../store/slice";
import { RootState, AppDispatch } from "../../../store";
import {
  SearchInput,
  UserCard,
  LoadingOverlay,
  EmptyStateView,
  Pagination,
} from "../../../shared/components";
import { SearchHeader } from "../components";
import { useDebounce } from "../../../shared/hooks";
import { colors, spacing } from "../../../shared/constants";

type RootStackParamList = {
  Home: undefined;
  CustomerDetail: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, loading, error, currentPage } = useSelector(
    (state: RootState) => state.users
  );

  const [searchInput, setSearchInput] = useState("");
  const [locale, setLocale] = useState((I18n as any).locale || "th");
  const debouncedSearchInput = useDebounce(searchInput, 300);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Update search when debounced value changes
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchInput));
  }, [debouncedSearchInput, dispatch]);

  const ITEMS_PER_PAGE = 10;
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handleSearch = (text: string) => {
    setSearchInput(text);
  };

  const handleUserPress = (user: any) => {
    dispatch(selectUser(user.id));
    navigation.navigate("CustomerDetail");
  };

  const toggleLang = () => {
    const newLocale = locale === "th" ? "en" : "th";
    (I18n as any).locale = newLocale;
    setLocale(newLocale);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const renderUserCard = ({ item }: { item: any }) => (
    <UserCard
      id={item.id}
      name={item.name}
      email={item.email}
      status={item.status}
      onPress={() => handleUserPress(item)}
    />
  );

  const renderEmptyList = () => (
    <EmptyStateView message={(I18n as any).t("home.noData")} />
  );

  if (loading && filteredUsers.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingOverlay message={(I18n as any).t("home.loading")} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        title={(I18n as any).t("home.title")}
        locale={locale}
        onToggleLanguage={toggleLang}
      />

      <SearchInput
        placeholder={(I18n as any).t("home.search")}
        value={searchInput}
        onChangeText={handleSearch}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={paginatedUsers}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />

      {filteredUsers.length > 0 && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          <Text style={styles.resultCount}>
            {(I18n as any).t("home.showingResults", {
              count: paginatedUsers.length,
              total: filteredUsers.length,
            })}
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: 8,
  },
  errorText: {
    color: "#c62828",
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    flexGrow: 1,
  },
  resultCount: {
    textAlign: "center",
    fontSize: 12,
    color: colors.text.secondary,
    paddingBottom: spacing.md,
  },
});

export default HomeScreen;
