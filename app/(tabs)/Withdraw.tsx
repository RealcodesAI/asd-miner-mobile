import { View, Text, ScrollView, RefreshControl } from "react-native";
import React from "react";
import Header from "@/components/Header/Header";
import InputWithdraw from "@/components/Withdraw/InputWithdraw";
import WithdrawHistory from "@/components/Withdraw/WithdrawHistory";
import { useRefresh } from "@/hooks/useRefresh";
import { stylesWithdraw } from "../css/styles/StylesWithdraw";
import { SafeAreaView } from "react-native-safe-area-context";

const Withdraw = () => {
  const { refreshing, refreshKey, onRefresh } = useRefresh();

  return (
    <SafeAreaView style={stylesWithdraw.container}>
      <ScrollView keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header title="Withdraw" />
        <InputWithdraw key={`input-${refreshKey}`} />
        <WithdrawHistory key={`history-${refreshKey}`} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Withdraw;
