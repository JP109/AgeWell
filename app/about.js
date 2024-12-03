// LandingScreen.js

import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import back from "../assets/images/chevron.png";

export default function AboutScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        {/* <View style={styles.waveContainer2}>
          <Image source={wave1} style={styles.waveImage} />
        </View>
        <View style={styles.waveContainer3}>
          <Image source={wave1} style={styles.waveImage} />
        </View> */}
        <View style={styles.titleContainer} lightColor="#f5fbf3">
          <TouchableOpacity
            style={styles.iconContainerBack}
            onPress={() => router.push("/settings")}
          >
            <Image source={back} style={styles.backButton} />
          </TouchableOpacity>
          <Text type="title" style={styles.titleText}>
            {" "}
            About{" "}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <View>
            {/* <Text style={styles.headingText}>1. Types data we collect</Text> */}
            <Text style={styles.bodyText}>
              At AgeWell, we are driven by the belief that technology can bridge
              the gap between independence and support, particularly for the
              elderly. Our mission is to simplify daily life by offering tools
              that promote health, organization, and well-being—all within a
              seamless, easy-to-use application. The AgeWell app is thoughtfully
              designed to cater to the unique needs of older adults. Whether
              it’s managing daily chores, tracking hydration, or receiving
              timely pill reminders, our goal is to make every feature intuitive
              and empowering. By focusing on simplicity and accessibility, we
              ensure that even users who are less familiar with technology can
              easily navigate and benefit from our app.
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View>
            {/* <Text style={styles.headingText}>2. Use of your personal data</Text> */}
            <Text style={styles.bodyText}>
              Our journey to create AgeWell has been an incredible collaborative
              effort. From brainstorming concepts to executing the final design,
              our team has worked tirelessly to bring this vision to life. Using
              Figma for prototyping and interface design, React Native for
              cross-platform development, and Node.js, Express.js, and MongoDB
              for building a reliable backend, every step of the process has
              been a testament to our dedication to excellence. What sets
              AgeWell apart is not just the technology behind it but also the
              heart and thoughtfulness that went into its creation. Our team is
              passionate about creating solutions that truly matter. We have
              prioritized essential features for our MVP to ensure the app meets
              its core objectives effectively, with a strong foundation for
              future enhancements. AgeWell is more than an app—it’s a commitment
              to fostering independence, simplifying routines, and enhancing the
              quality of life for our users. With your feedback and continued
              support, we’re excited to grow, improve, and make AgeWell a
              trusted companion for every user who needs it.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Get the screen width dynamically
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  waveContainer1: {
    position: "absolute",
    top: 0,
    right: -100,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width * 0.93,
    height: height * 0.3,
  },
  waveContainer2: {
    position: "absolute",
    top: 100,
    left: -100,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width * 0.93,
    height: height * 0.3,
  },
  waveContainer3: {
    position: "absolute",
    right: -150,
    bottom: -200,
    zIndex: -1, // Place behind the main content
    justifyContent: "center",
    alignItems: "center",

    width: width,
    height: height * 0.4,
  },
  waveImage: {
    width: "100%", // Cover the full width of the container
    height: "100%", // Cover the full height of the container
    resizeMode: "contain", // Ensure the image covers the container without distortion
    borderRadius: 10, // Optional: Add rounded corners if needed
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5fbf3",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 25,
  },
  titleText: {
    fontSize: 25,
    color: "#69707E",
    fontWeight: "bold",
  },
  headingText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#69707E",
  },
  bodyText: {
    fontSize: 16,
    color: "#69707E",
  },
  rowContainer: {
    marginTop: 30,
    color: "#69707E",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingLeft: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  iconContainer: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 2,
  },
  iconImage: {
    maxHeight: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
  },
  iconContainerBack: {
    width: 15,
    height: 15,
    // position: "absolute",
    // left: 30,
    // top: 30,
  },
  backButton: {
    maxHeight: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
  },
});
