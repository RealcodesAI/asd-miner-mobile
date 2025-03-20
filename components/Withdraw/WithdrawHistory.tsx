import {View, Text, Image, ActivityIndicator, TouchableOpacity} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {useWithdrawHistories} from "@/lib/zustand/useWithdrawHistories";
import {Ionicons} from '@expo/vector-icons';
import {stylesWithdraw} from "@/app/css/styles/StylesWithdraw";
import {useMinerStore} from "@/lib/zustand/miner";

const WithdrawHistory = ({loadMore}: any) => {
  const {histories, isLoading, fetchWithdrawHistories} = useWithdrawHistories();
  const [limit, setLimit] = useState(5);
  const {minerName} = useMinerStore()
  const prevLoadMore = useRef(loadMore);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadHistories = () => {
    setLoadingMore(true);
    const params = {
      limit
    };
    setLoadingMore(true);
    fetchWithdrawHistories(params);
    setLoadingMore(false);

  };
  // Phát hiện khi nào loadMore thay đổi từ false -> true
  useEffect(() => {
    if (loadMore && !prevLoadMore.current && !loadingMore && histories?.contents && histories?.contents?.length < histories?.total) {
      setLimit(prev => prev + 5);
    }
    prevLoadMore.current = loadMore;
  }, [loadMore]);

  useEffect(() => {
    loadHistories();
  }, [limit]);

  const handleRefresh = () => {
    setLimit(5);
    loadHistories();
  };

  if (isLoading && limit === 5) return <ActivityIndicator size="large" color="#0000ff"/>;

  return (
    <>
      <View style={{flex: 1}}>
        <View style={stylesWithdraw.headerContainer}>
          <Text style={stylesWithdraw.historyTitle}>Withdraw history</Text>
          <TouchableOpacity onPress={handleRefresh} style={stylesWithdraw.refreshButton}>
            <Ionicons name="refresh" size={24} color="#333"/>
          </TouchableOpacity>
        </View>

        {histories?.contents.map((item, index) => (
          <View key={index} style={stylesWithdraw.historyItem}>
            {/* Avatar */}
            <View style={stylesWithdraw.avatarContainer}>
              <Image
                source={require("../../assets/images/avatar/image 173.png")}
                style={stylesWithdraw.avatar}
              />
            </View>

            {/* Nội dung */}
            <View style={{flex: 1, marginLeft: 15}}>
              <View style={stylesWithdraw.rowBetween}>
                <Text style={stylesWithdraw.amount}>{item.amount} ASD</Text>
                <Text style={stylesWithdraw.time}>  {new Date(item.createdAt).toLocaleString("vi-VN")}  </Text>
              </View>
              <View style={{marginTop: 7}}>
                <Text style={stylesWithdraw.detail}>
                  recipient: {item.recipient?.slice(0, 6)}...{item.recipient?.slice(-4)}
                </Text>
                <Text style={stylesWithdraw.detail}>
                  txHash:{" "}
                  <Text style={{color: '#1E66D2', textDecorationLine: 'underline'}}>
                    {item.txHash?.slice(0, 6)}...{item.txHash?.slice(-4)}
                  </Text>
                </Text>
                <Text style={stylesWithdraw.detail}>Miner: {minerName}</Text>
              </View>
            </View>
          </View>
        ))}
        {/* Loading indicator */}
        {loadMore && (
          <View style={{alignItems: 'center', padding: 10}}>
            <ActivityIndicator size="small" color="#0000ff"/>
          </View>

        )}
      </View>
    </>
  );
};

export default WithdrawHistory;