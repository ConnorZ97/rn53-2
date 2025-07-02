import {
  AnimatedFlashList,
  CellContainer,
  FlashList,
} from "@shopify/flash-list";
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  LayoutAnimation,
} from "react-native";
import { useMemo, useRef, useState } from "react";
import Animated, {
  JumpingTransition,
  LinearTransition,
  SequencedTransition,
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";

const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);

export default function FlashListScreen() {
  const [DATA, setDATA] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const hasMore = useMemo(() => {
    return DATA.length < 200;
  }, [DATA]);

  const [secondRound, setSecondRound] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const list = useRef<FlashList<number> | null>(null);

  return (
    <View className={"flex-1"}>
      <View
        style={{
          height: 60,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 16,
          marginTop: 16,
        }}
      >
        <Text style={{ color: "white" }}>Sticky Header</Text>
      </View>
      <AnimatedFlashList
        ref={list}
        CellRendererComponent={(props) => (
          <AnimatedCellContainer
            {...props}
            layout={JumpingTransition}
            entering={SlideInLeft}
            exiting={SlideOutRight}
          />
        )}
        disableAutoLayout={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              setSecondRound(true);
              await new Promise((r) => setTimeout(r, 3000));
              setDATA((x) => [
                ...x,
                ...Array.from(Array(50).keys()).map(
                  (_, i) => Math.random() * 100000,
                ),
              ]);
              setRefreshing(false);
            }}
            colors={["blue"]}
            tintColor={"blue"}
          />
        }
        data={DATA}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 32,
        }}
        contentContainerClassName={"grow"}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setDATA((d) =>
                d.filter((i) => {
                  return i !== item;
                }),
              );
            }}
            className={
              "flex flex-col items-center justify-center bg-white rounded p-[16px]"
            }
            style={{ elevation: 4 }}
          >
            <Text>{item}</Text>
          </Pressable>
        )}
        estimatedItemSize={40}
        keyExtractor={(item, index) => item.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 32 }}></View>}
        onEndReached={async () => {
          console.log("EndReached, hasMore", hasMore ? "true" : "false");
          if (!hasMore) return;

          setLoading(true);
          await new Promise((r) => setTimeout(r, 1000));

          if (secondRound) {
            setDATA((x) => [
              ...x,
              ...Array.from(Array(50).keys()).map(
                (_, i) => Math.random() * 100000,
              ),
            ]);
          }
          setLoading(false);
        }}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          DATA.length > 0 ? (
            <View
              className={
                "flex flex-row items-center justify-center py-[16px] bg-red-700"
              }
            >
              {hasMore ? (
                loading && <ActivityIndicator size={"large"} />
              ) : (
                <Text>You’ve reached the end of the list.</Text>
              )}
            </View>
          ) : undefined
        }
        ListEmptyComponent={
          <View className={"h-full items-center justify-center bg-red-700"}>
            {loading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <Text>Ops, nothing here</Text>
            )}
          </View>
        }
      />
    </View>
  );
}
