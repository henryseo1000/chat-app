import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules/redux/RootReducer';
import { setTemplate } from '../../modules/redux/slice/AccountSlice';

function HomeScreen({navigation} : any) {
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.template);

  return (
    <View
      style={st.homeContainer}
    >
      <View
        style={st.userInfoArea}
      >
        <Image
          style={st.profileImage}
          source={require('../../assets/image/defaultProfileImage.png')}
        />
        <Text
          style={st.informText}
        >
          You're connected as
        </Text>
        <Text
          style={st.userNameText}
        >
          {userInfo.userId}
        </Text>
      </View>

      <Button
        title="Open Global Chat"
        onPress={() => navigation.navigate('Chat')}
      />

      <Button
        title="Logout"
        onPress={() => {
          navigation.navigate('Login');
          dispatch(setTemplate({userName: "", userId: ""}));
        }}
      />
    </View>
  )
}

const st = StyleSheet.create({
  homeContainer: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    backgroundColor: "#191B43",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  informText: {
    color: "#585C9E"
  },
  userNameText: {
    color: "#ffffff",
    fontSize: 40
  },
  userInfoArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 50,
    paddingVertical: 30,
    backgroundColor: "#262A78",
    borderRadius: 30
  }
})

export default HomeScreen;