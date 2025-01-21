import { useMutation } from 'convex/react';
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import { api } from '../../convex/_generated/api';
import { useNavigation } from '@react-navigation/native';
import { setTemplate } from '../../modules/redux/slice/AccountSlice';

function LoginScreen() {
    const [id, setId] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [flag, setFlag] = useState<boolean>(true);

    const verify = useMutation(api.login.authentication);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const setUserInfo = (id: string) => {
        dispatch(setTemplate({userName: id, userId: id}));
    }

    return (
        <SafeAreaView
            style={st.loginContainer}
        >
            <View
                style={st.titleArea}
            >
                <Text
                    style={st.titleTextTop}
                >
                    TEST
                </Text>
                <Text
                    style={st.titleTextBottom}
                >
                    CHAT
                </Text>
            </View>

            <View
                style={st.inputArea}
            >
                <TextInput
                    style={st.textInput}
                    value={id}
                    placeholder='Type Your ID Here'
                    onChangeText={(e) => setId(e)}
                />

                <TextInput
                    style={st.textInput}
                    value={pw}
                    placeholder='Type Your PW Here'
                    onChangeText={(e) => setPw(e)}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
                style={st.loginButton}
                onPress={async () => {
                    const auth = await verify({userId: id, userPw: pw});
                    if (auth) {
                        setUserInfo(id);
                        setFlag(true);
                        navigation.navigate('Home' as never);
                    }
                    else {
                        setFlag(false);
                    }
                }}
            >
                <Text
                    style={st.buttonText}
                >
                    LOGIN
                </Text>
            </TouchableOpacity>

            {  !flag && 
                <View
                    style={st.warningArea}
                >
                    <Text
                        style={st.warningText}
                    >
                        OOPS, Something's Wrong! Try Again.
                    </Text>
                </View>
            }

            <Text
                style={st.signUpText}
                onPress={ async () => {
                    navigation.navigate('SignUp' as never);
                }}
            >
                SIGN UP
            </Text>
        </SafeAreaView>
    )
}

const st = StyleSheet.create({
    loginContainer: {
      display: "flex",
      height: "100%",
      gap: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#242762"
    },
    titleArea: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    titleTextTop: {
        color: "#ffffff",
        fontSize: 70,
        fontWeight: "bold"
    },
    titleTextBottom: {
        color: "#ffffff",
        fontSize: 40,
    },
    loginButton: {
        display: "flex",
        height: 40,
        width: "50%",
        justifyContent: "center",
        backgroundColor: "#333DF7",
        borderRadius: 10,
    },
    buttonText: {
        width: "100%",
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "bold"
    },
    inputArea: {
        width: "100%",
        gap: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        width: "50%",
        height: 40,
        paddingLeft: 10,
        backgroundColor: "#d9d9d9",
        borderRadius: 10
    },
    signUpText: {
        color: "#585C9E",
        textDecorationLine: "underline"
    },
    warningArea : {
        padding: 10,
        borderWidth: 1,
        borderColor: "#FF1212",
        borderRadius: 10,
        backgroundColor: "#F73333"
    },
    warningText : {
        color: "#ffffff",
        fontSize: 10
    }
});

export default LoginScreen;