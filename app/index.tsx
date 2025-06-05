import * as React from "react";
import { Button } from "react-native";

import {
  createDownloadResumable,
  DownloadOptions,
  FileSystemSessionType,
  getInfoAsync,
  cacheDirectory,
} from "expo-file-system";

export default function Screen() {
  // async function load() {
  // *IMPORTANT*: The correct file extension is always required.
  // You might encounter issues if the file's extension isn't included
  // or if it doesn't match the mime type of the file.
  // https://stackoverflow.com/a/47767860
  // function getUrlExtension(url: string) {
  //   return url.split(/[#?]/)[0].split(".").pop()?.trim() ?? "";
  // }
  //
  // const extension = getUrlExtension(url);
  //
  // // Feel free to change main path according to your requirements.
  // const localFile = `${documentDirectory}/temporaryfile.${extension}`;
  //
  // const options = {
  //   fromUrl: url,
  //   toFile: localFile,
  // };
  //
  // try {
  //   const result = await downloadAsync(url, localFile);
  //   await open(result.uri, { displayName: "Downloaded PDF" });
  //
  //   // await openFileAsync(result.uri);
  // } catch (e) {
  //   // error
  // }
  // }

  const url =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  const fileUri = cacheDirectory + "dummy.pdf";
  //
  // const [downloadProgress, setDownloadProgress] = useState(0);
  //
  // const callback: FileSystemNetworkTaskProgressCallback<
  //   DownloadProgressData
  // > = (downloadProgress) => {
  //   const progress =
  //     downloadProgress.totalBytesWritten /
  //     downloadProgress.totalBytesExpectedToWrite;
  //   setDownloadProgress(progress);
  // };
  //
  // const downloadResumable = FileSystem.createDownloadResumable(
  //   url,
  //   fileUri,
  //   {
  //     cache: true,
  //     sessionType: FileSystemSessionType.BACKGROUND,
  //   },
  //   callback,
  // );
  //
  // async function download() {
  //   try {
  //     const fileInfo = await FileSystem.getInfoAsync(fileUri);
  //
  //     if (fileInfo.exists) {
  //       console.log("File already exists:", fileUri);
  //       await open(fileUri, { displayName: "Dummy" });
  //     } else {
  //       const result = await downloadResumable.downloadAsync();
  //       console.log("Finished downloading to ", result?.uri);
  //
  //       if (!result) return;
  //       await open(result.uri, { displayName: "Dummy" });
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  return (
    <>
      <Button
        title={"Download"}
        onPress={async () => {
          const resultUri = await downloadFileAsync(url, fileUri, {
            cache: true,
            sessionType: FileSystemSessionType.BACKGROUND,
          });
          console.log("result uri", resultUri);
        }}
      />
    </>
  );
}

async function downloadFileAsync(
  uri: string,
  fileUri: string,
  options?: DownloadOptions,
): Promise<string | undefined> {
  const downloadResumable = createDownloadResumable(uri, fileUri, options);

  try {
    const fileInfo = await getInfoAsync(fileUri);
    if (fileInfo.exists) {
      console.log("Exists");
      return fileInfo.uri;
    } else {
      const result = await downloadResumable.downloadAsync();
      console.log("Download result", result);
      return result?.uri;
    }
  } catch (e) {
    console.error(e);
  }
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
