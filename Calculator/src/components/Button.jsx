import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function Button({ title, onPress, isBlue, isGray }) {
    const theme = useContext(ThemeContext);
    
    // Special style for Convert button and unit buttons
    const buttonStyle = title === "Convert" 
        ? Styles.btnConvert
        : [
            Styles.btnUnit, 
            { 
                backgroundColor: isBlue 
                    ? myColors.orange  // Selected state
                    : theme === "light" 
                        ? myColors.white  // Unselected state (light theme)
                        : myColors.btnDark // Unselected state (dark theme)
            }
          ];

    // Text style based on button state
    const textStyle = [
        Styles.smallTextLight,
        {
            color: isBlue 
                ? myColors.white  // Selected state text
                : theme === "light"
                    ? myColors.black  // Unselected state text (light theme)
                    : myColors.white  // Unselected state text (dark theme)
        }
    ];

    return (
        <TouchableOpacity 
            style={buttonStyle}
            onPress={onPress}>
            <Text style={textStyle}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
