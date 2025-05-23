import * as React from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";

import {
  useFloating,
  shift,
  arrow,
  autoPlacement,
  offset,
} from "@floating-ui/react-native";
import { useEffect, useRef, useState } from "react";
import absoluteFill = StyleSheet.absoluteFill;

export default function Screen() {
  const [visible, setVisible] = useState(false);
  const { refs, floatingStyles, update, scrollProps } = useFloating({
    placement: "bottom",
    middleware: [offset(10), shift()],
    // sameScrollView: false,
  });

  useEffect(() => {
    console.log(floatingStyles);
    // update();
  }, [floatingStyles]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
      {/*<ScrollView {...scrollProps}>*/}
      {/*  {Array.from(Array(100).keys()).map((_, i) => {*/}
      {/*    return i == 10 ? (*/}
      {/*      <View ref={refs.setReference} collapsable={false}>*/}
      {/*        <Button*/}
      {/*          title="Show Tooltip"*/}
      {/*          onPress={() => setVisible(!visible)}*/}
      {/*        />*/}
      {/*      </View>*/}
      {/*    ) : (*/}
      {/*      <View>*/}
      {/*        <Button title="Hi" />*/}
      {/*      </View>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</ScrollView>*/}

      <View ref={refs.setReference} collapsable={false}>
        <Button title="Show Tooltip" onPress={() => setVisible(!visible)} />
      </View>

      {visible && (
        <View
          style={absoluteFill}
          // className={"bg-black/10"}
          onTouchEnd={() => setVisible(false)}
        >
          <View ref={refs.setOffsetParent}>
            <View
              ref={refs.setFloating}
              style={{ ...floatingStyles }}
              className={"bg-black px-4 py-6 rounded-lg"}
            >
              <Text style={{ color: "white" }}>Hello from Floating UI!</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
