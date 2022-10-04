import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


////////////////////////
///                  ///
///      Styles      ///
///                  ///
////////////////////////

    const defaultSelectedColor = "cyan"    

    const Styles = StyleSheet.create({
        defaultSelected: {
            backgroundColor: defaultSelectedColor,
            height: 60,
            width: 100,
        },
        defaultInactive: {
            backgroundColor: 'grey',
            height: 45,
            width: 70,
            marginTop: 7.5,
            marginLeft: 15
        },
        defaultText: {
            fontSize: 16,
            fontWeight: "500"
        }
    })


const OptionsButtons = ({
    buttonsArray=[],        // An array of strings that will be the options selectable. Length of 2 to 3

    selectedStyle={...Styles.defaultSelected},          // Default Selected Button Appearance
    inactiveStyle={...Styles.defaultInactive},          // Default Inactive Button Appearance

    textStyle={...Styles.defaultText},                  // Default Text Style. Will be universal and overrule other text styles
    activeTextStyle=false,                              // Custom selected button text
    inactiveTextStyle=false,                            // Custom inactive button text

    onClick= (index) => {return null},          // Runs on the click of any button
    onClickButtonOne=false,                             // Custom Function to run only on the first button
    onClickButtonTwo=false,                             // Custom Function to run only on the second button
    onClickButtonThree=false,                           // Custom Function to run only on the third button

    initialSelected=false                       // Either False or an int, 0 to the length of buttonsArray

}) => {

    ///////////////////////////
    ///                     ///
    ///        State        ///
    ///                     ///
    ///////////////////////////

        const [selected, setSelected] = useState(initialSelected)

    ////////////////////////////
    ///                      ///
    ///    Error Catching    ///
    ///                      ///
    ////////////////////////////

        // Invalid buttonsArray 
        if (buttonsArray.length != 2 && buttonsArray.length != 3){
            throw new Error ("Buttons Array needs to be an array of strings with a length of 2 or 3")
        }

        // invalid initialSelected
        if (initialSelected){
            if (initialSelected >= buttonsArray.length){
                throw new Error("Initial Selected must either be false or an integer greater than 0 but less than the length of buttonsArray")
            }
        }

    ///////////////////////////
    ///                     ///
    ///      Rendering      ///
    ///                     ///
    ///////////////////////////

        // Renders a single button
        function renderSingleButton(button, index){
            return(
                <TouchableOpacity 
                    style={determineSelection(index)}
                    onPress={() => handleClick(index)}
                    key={index}
                >
                    <Text style={determineTextStyle(index)}>
                        {button}
                    </Text>
                </TouchableOpacity>
            )
        }

        // Renders all of the buttons
        function renderAllButtons(){
            return buttonsArray.map( (button, index) => {
                return renderSingleButton(button, index)
            })
        }

    ///////////////////////////
    ///                     ///
    ///       Handlers      ///
    ///                     ///
    ///////////////////////////

        //////////////
        // Handlers //
        //////////////

            // Handles Button Clicks
            function handleClick(index){
                onClick(index)
                setSelected(index)
                if (index === 0 && onClickButtonOne){
                    onClickButtonOne()
                }
                else if (index === 1 && onClickButtonTwo){
                    onClickButtonTwo()
                }
                else if (index === 2 && onClickButtonThree){
                    onClickButtonThree()
                }
            }

        ///////////////////
        // Determinators //
        ///////////////////

            // Determines if the Button is selected or not
            function determineSelection(index){
                if (index === selected){
                    return selectedStyle
                }
                else{
                    return inactiveStyle
                }
            }

            // Determines Text Styled based on selection and existance of other styles
            function determineTextStyle(index){
                if (index === selected && activeTextStyle){
                    return activeTextStyle
                }
                else if (index !== selected && inactiveTextStyle){
                    return inactiveTextStyle
                }
                else{
                    return textStyle
                }
            }

    ///////////////////////////
    ///                     ///
    ///         Main        ///
    ///                     ///
    ///////////////////////////

    return(
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {renderAllButtons()}
        </View>
    )

}

export default OptionsButtons