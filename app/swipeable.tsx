import {
  Button,
  LayoutAnimation,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useRef, useState } from "react";
import { Text, StyleSheet } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  FadeIn,
  FadeOut,
  JumpingTransition,
  LinearTransition,
  SharedValue,
  SlideInLeft,
  SlideOutRight,
  useAnimatedStyle,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  AnimatedFlashList,
  CellContainer,
  FlashList,
  ListRenderItem,
} from "@shopify/flash-list";

const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);

function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  onRightPress: () => void,
) {
  const styleAnimation = useAnimatedStyle(() => {
    // console.log("showRightProgress:", prog.value);
    // console.log("appliedTranslation:", drag.value);

    return {
      transform: [{ translateX: drag.value + 100 }],
    };
  });

  return (
    <>
      <Animated.View
        style={{
          ...styleAnimation,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onRightPress}
          className={
            "w-[100px] bg-red-700 h-full flex items-center justify-center"
          }
        >
          <FontAwesome5 name={"trash"} color={"white"} size={20}></FontAwesome5>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

type BasicType = {
  name: string;
  value: number;
};

const data: BasicType[] = [{ name: "1", value: 1 }];

function renderItem({
  item,
  onRightPress,
}: {
  item: BasicType;
  onRightPress: () => void;
}) {
  return (
    <ReanimatedSwipeable
      containerStyle={{
        minHeight: 100,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        borderRadius: 16,
        elevation: 8,
      }}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={(progress, translation) =>
        RightAction(progress, translation, onRightPress)
      }
      overshootRight={false}
      childrenContainerStyle={{ flex: 1, display: "flex", width: "100%" }}
    >
      <TouchableHighlight
        underlayColor={"#DDD"}
        onPress={() => {}}
        className={" flex flex-1 w-full items-center justify-center"}
      >
        <Text>{item.name}</Text>
      </TouchableHighlight>
    </ReanimatedSwipeable>
  );
}

export default function SwipeableScreen() {
  const [listData, setListData] = useState(data);
  const list = useRef<FlashList<BasicType> | null>(null);

  return (
    <GestureHandlerRootView>
      <View className={"flex-1"}>
        <Button
          title={"add"}
          onPress={() => {
            const randomNumber = Math.floor(
              Math.random() * Math.floor(Math.random() * Date.now()),
            );
            setListData([
              ...listData,
              {
                name: randomNumber.toString(),
                value: randomNumber,
              },
            ]);
          }}
        />
        <AnimatedFlashList
          key={"flashlist"}
          ref={list}
          contentContainerClassName={"px-[16px] py-[24px]"}
          data={listData}
          renderItem={({ item }) =>
            renderItem({
              item: item,
              onRightPress: () => {
                console.log("on right press", item.name);
                list.current?.prepareForLayoutAnimationRender();
                setListData((v) => v.filter((x) => x.name != item.name));
              },
            })
          }
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          onEndReached={() => {
            console.log("onEndReached");
          }}
          // CellRendererComponent={(props) => (
          //   <AnimatedCellContainer
          //     {...props}
          //     layout={LinearTransition}
          //     entering={FadeIn}
          //     exiting={FadeOut}
          //   />
          // )}
          keyExtractor={(item, index) => item.value.toString()}
          onEndReachedThreshold={0.3}
          estimatedItemSize={64}
        />
        {/*<Reanimated.ScrollView>*/}
        {/*  {listData.map((item) => (*/}
        {/*    <ReanimatedSwipeable*/}
        {/*      key={item.value}*/}
        {/*      containerStyle={{*/}
        {/*        minHeight: 100,*/}
        {/*        backgroundColor: "white",*/}
        {/*        alignItems: "center",*/}
        {/*        justifyContent: "center",*/}
        {/*        display: "flex",*/}
        {/*        borderRadius: 16,*/}
        {/*        elevation: 8,*/}
        {/*      }}*/}
        {/*      friction={2}*/}
        {/*      enableTrackpadTwoFingerGesture*/}
        {/*      rightThreshold={40}*/}
        {/*      renderRightActions={(progress, translation) =>*/}
        {/*        RightAction(progress, translation, () => {*/}
        {/*          console.log("on right press", item.name);*/}
        {/*          setListData((v) => v.filter((x) => x.name != item.name));*/}
        {/*        })*/}
        {/*      }*/}
        {/*      overshootRight={false}*/}
        {/*      childrenContainerStyle={{*/}
        {/*        flex: 1,*/}
        {/*        display: "flex",*/}
        {/*        width: "100%",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <TouchableHighlight*/}
        {/*        underlayColor={"#DDD"}*/}
        {/*        onPress={() => {}}*/}
        {/*        className={" flex flex-1 w-full items-center justify-center"}*/}
        {/*      >*/}
        {/*        <Text>{item.name}</Text>*/}
        {/*      </TouchableHighlight>*/}
        {/*    </ReanimatedSwipeable>*/}
        {/*  ))}*/}
        {/*</Reanimated.ScrollView>*/}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
});
