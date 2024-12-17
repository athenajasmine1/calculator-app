import { StyleSheet } from "react-native";
import { myColors } from "./Colors"; 

export const Styles = StyleSheet.create({
    // Button
    btnBlue: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.orange,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnDark: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.btnDark,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnLight: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.white,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnGray: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.btnGray,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    smallTextLight: {
        fontSize: 14,
        color: myColors.white,
        textAlign: 'center',
    },
    smallTextDark: {
        fontSize: 14,
        color: myColors.black,
        textAlign: 'center',
    },
    // Keyboard
    row: {
        maxWidth: '100%',
        flexDirection: "row",
    },
    viewBottom: {
        position: 'absolute',
        bottom: 50,
    },
    screenFirstNumber: {
        fontSize: 96,
        color: myColors.gray,
        fontWeight: '200',
        alignSelf: "flex-end",
    },
    screenSecondNumber: {
        fontSize: 40,
        color: myColors.gray,
        fontWeight: '200',
        alignSelf: "flex-end",
    },
    btnConvert: {
        width: 150,
        height: 60,
        borderRadius: 30,
        backgroundColor: myColors.orange,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnUnit: {
        width: 90,
        height: 50,
        borderRadius: 15,
        backgroundColor: myColors.orange,
        justifyContent: "center",
        alignItems: "center",
        margin: 4,
        padding: 5,
    },
    unitText: {
        fontSize: 12,
        color: myColors.white,
        textAlign: 'center',
        fontWeight: '600',
    },
});