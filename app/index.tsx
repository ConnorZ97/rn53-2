import * as React from "react";
import { open } from "react-native-file-viewer-turbo";
import { Button } from "react-native";
import { documentDirectory, downloadAsync } from "expo-file-system";
export default function Screen() {
  async function load() {
    const url =
      "https://github.com/Vadko/react-native-file-viewer-turbo/raw/main/docs/sample.pdf";

    // *IMPORTANT*: The correct file extension is always required.
    // You might encounter issues if the file's extension isn't included
    // or if it doesn't match the mime type of the file.
    // https://stackoverflow.com/a/47767860
    function getUrlExtension(url: string) {
      return url.split(/[#?]/)[0].split(".").pop()?.trim() ?? "";
    }

    const extension = getUrlExtension(url);

    // Feel free to change main path according to your requirements.
    const localFile = `${documentDirectory}/temporaryfile.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };

    try {
      const result = await downloadAsync(url, localFile);
      await open(result.uri, { displayName: "Downloaded PDF" });
    } catch (e) {
      // error
    }
  }

  return (
    <>
      <Button title={"Download"} onPress={() => load()} />
    </>
  );
}

// const [visible, setVisible] = useState(false);
// const { refs, floatingStyles, update, scrollProps } = useFloating({
//   placement: "bottom",
//   middleware: [offset(10), shift()],
//   // sameScrollView: false,
// });
//
// useEffect(() => {
//   console.log(floatingStyles);
//   // update();
// }, [floatingStyles]);
//   <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
//     {/*<ScrollView {...scrollProps}>*/}
//     {/*  {Array.from(Array(100).keys()).map((_, i) => {*/}
//     {/*    return i == 10 ? (*/}
//     {/*      <View ref={refs.setReference} collapsable={false}>*/}
//     {/*        <Button*/}
//     {/*          title="Show Tooltip"*/}
//     {/*          onPress={() => setVisible(!visible)}*/}
//     {/*        />*/}
//     {/*      </View>*/}
//     {/*    ) : (*/}
//     {/*      <View>*/}
//     {/*        <Button title="Hi" />*/}
//     {/*      </View>*/}
//     {/*    );*/}
//     {/*  })}*/}
//     {/*</ScrollView>*/}
//
//     <View ref={refs.setReference} collapsable={false}>
//       <Button title="Show Tooltip" onPress={() => setVisible(!visible)} />
//     </View>
//
//     {visible && (
//       <View
//         style={absoluteFill}
//         // className={"bg-black/10"}
//         onTouchEnd={() => setVisible(false)}
//       >
//         <View ref={refs.setOffsetParent}>
//           <View
//             ref={refs.setFloating}
//             style={{ ...floatingStyles }}
//             className={"bg-black px-4 py-6 rounded-lg"}
//           >
//             <Text style={{ color: "white" }}>Hello from Floating UI!</Text>
//           </View>
//         </View>
//       </View>
//     )}
//   </View>
