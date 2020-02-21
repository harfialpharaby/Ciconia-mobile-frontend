import React from "react";
import {
  Modal,
  View,
  Button,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ToastAndroid
} from "react-native";
import {
  AntDesign,
  EvilIcons,
  Entypo,
  MaterialIcons
} from "@expo/vector-icons";
// import { useMutation } from "@apollo/react-hooks";

// import { ADD_MOVIE, ADD_TV, GET_MOVIES, GET_TV } from "../graphql";

export default function AddModal(props) {
  const { item, visible, setVisible } = props;
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      presentationStyle="pageSheet"
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>INI MODAL</Text>
        <Button onPress={() => setVisible(false)} title="Hide Modal"></Button>
      </View>
    </Modal>
  );
  const dynamicFontSize = item.title.length < 50 ? 50 : 35;
  const [addMovie] = useMutation(ADD_MOVIE);
  const [addTv] = useMutation(ADD_TV);

  const normalizeTags = tags => {
    const normalizedTags = tags.reduce((acc, tag) => {
      acc.push(tag.name);
      return acc;
    }, []);

    return normalizedTags;
  };

  const showToastHideModal = type => {
    Platform.OS === "android"
      ? ToastAndroid.show(`Successfully added to ${type}`, ToastAndroid.SHORT)
      : null;
    setVisible(false);
  };

  const handleAddMovie = () => {
    const tags = normalizeTags(item.tags);
    addMovie({
      variables: {
        title: item.title,
        overview: item.overview,
        posterPath: item.poster_path,
        popularity: item.popularity,
        tags
      },
      update: (cache, { data }) => {
        const cacheData = cache.readQuery({ query: GET_MOVIES });
        cache.writeQuery({
          query: GET_MOVIES,
          data: { movies: cacheData.movies.concat([data.addMovie]) }
        });
      }
    });
    showToastHideModal("Movie");
  };

  const handleAddTv = () => {
    const tags = normalizeTags(item.tags);
    addTv({
      variables: {
        title: item.title,
        overview: item.overview,
        posterPath: item.poster_path,
        popularity: item.popularity,
        tags
      },
      update: (cache, { data }) => {
        const cacheData = cache.readQuery({ query: GET_TV });
        cache.writeQuery({
          query: GET_TV,
          data: { tvAll: cacheData.tvAll.concat([data.addTv]) }
        });
      }
    });
    showToastHideModal("Tv");
  };

  return visible ? (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      presentationStyle="pageSheet"
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <ImageBackground
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`
            }}
            style={{
              flex: 1,
              flexDirection: "row"
            }}
            imageStyle={{ bottom: 70 }}
            blurRadius={1}
          >
            <View style={{ flex: 0.5 }}></View>
            <View style={styles.background}>
              <View style={styles.foreground}>
                <Text style={{ fontSize: dynamicFontSize }}>{item.title}</Text>
                {item.original_title !== item.title ? (
                  <Text>({item.original_title})</Text>
                ) : null}
                <Text style={styles.overview}>Overview</Text>
                <Text style={{ letterSpacing: 1 }}>{item.overview}</Text>
                <View style={styles.popularWrapper}>
                  <EvilIcons
                    name="like"
                    size={20}
                    color={"grey"}
                    style={{ opacity: 0.5, alignSelf: "baseline" }}
                  />
                  <Text style={{ alignSelf: "baseline", color: "grey" }}>
                    {item.popularity}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnHide}
              onPress={() => {
                setVisible(false);
              }}
            >
              <AntDesign name="down" size={32} color="white"></AntDesign>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginRight: 20 }}>
              <TouchableOpacity style={styles.btnSave} onPress={handleAddTv}>
                <Entypo name="tv" size={28} color="white"></Entypo>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSave} onPress={handleAddMovie}>
                <MaterialIcons
                  name="local-movies"
                  size={32}
                  color="white"
                ></MaterialIcons>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 50
  },
  foreground: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30
  },
  overview: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  },
  popularWrapper: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "flex-end"
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    height: 100,
    bottom: 0,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "space-between"
  },
  btnHide: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "red",
    borderRadius: 50,
    marginLeft: 20
  },
  btnSave: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#4BC7FD",
    borderRadius: 50,
    marginLeft: 20
  }
});
