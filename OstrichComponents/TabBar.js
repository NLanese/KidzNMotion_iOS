import React from "react";
import { useEffect, useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";


const defaultActiveTab = ({
    borderBottomWidth: 4,
    borderBottomColor: 'white'
})
const defaultInactiveTab = ({
    borderBottomWidth: 4,
    borderBottomColor: 'grey'
})
const defaultActiveText = ({
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 4
})
const defaultInactiveText = ({
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 4,
})


const TabBar = ({
    tabsArray, // An array of all the tab titles (strings)

    styleActive = false, // What style each tab bar will have when it is active
    styleInactive = false, // What style each tab bar will have when it is inactive

    tabTextStyleActive = false, // What style each tab bar's title will have when it is active
    tabTextStyleInactive = false, // What style each tab bar's title will have when it is inactive

    height = false, // Determines the height of the tab bar
    width = false, // Determines width of the tab bar
    borderRadius = false, // Determines Border Radius

    onChangeIndex = false, // Method to run whenever a different tab is selected. TAKES THE INDEX SELECTED AS A PARAMETER
    startIndex = false, // Determines which index starts off selected. Defaults to 0 (first tab)
}) => {


// --------------------------------------------------- //
//                                                     //
//                 DEFAULT SETTINGS                    //
//               No Function Default                   //
//v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v//       
    if (!tabsArray){
        throw new Error("Error! <TabBar> Components need a tabsArray prop. This will be an array of strings to be displayed as the Tab Titles. The current value of the tabsArray prop is ", tabsArray)
    }
    if (!height){
        height = 75
    }
    if (!width){
        width = 250
    }
    if (!styleActive){
        styleActive = defaultActiveTab
    }
    if (!styleInactive){
        styleInactive = defaultInactiveTab
    }
    if (!tabTextStyleActive){
        tabTextStyleActive = defaultActiveText
    }
    if (!tabTextStyleInactive){
        tabTextStyleInactive = defaultInactiveText
    }
    if (!borderRadius){
        borderRadius = 3
    }
    if (!startIndex){
        startIndex = 0
    }
    if (startIndex > tabsArray.length){
        throw new Error("Error: <TabBar> cannot have a startIndex prop that is larger than the tabArray prop's length!")
    }



// --------------------------------------------------- //
//                                                     //
//                   LOCAL STATES                      //
//               with Function Default                 //
//v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v// 

    const [selectedIndex, setSelectedIndex] = useState(startIndex)

    if (!onChangeIndex){
        onChangeIndex = (index) => {
            return null
        } 
    }


// --------------------------------------------------- //
//                                                     //
//                DETERMINING STYLES                   //
//                                                     //
//v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v//   

    // The Outter Container Style
    const tabContainer = ({
        height: height,
        width: 'auto',
        borderRadius: borderRadius,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    })

    // Creates the official Style Object
    const Styles = StyleSheet.create({
        styleActive: {...styleActive},
        styleInactive: {...styleInactive},
        tabTextStyleActive: {...tabTextStyleActive},
        tabTextStyleInactive: {...tabTextStyleInactive},
        tabContainer: {...tabContainer}
    })


    // Renders the Active and Inactive Tab Styles
    const determineTabStyles = (index) => {
        if (index == selectedIndex){
            return {...Styles.styleActive}
        }
        else{
            return {...Styles.styleInactive}
        }
    }

    // Renders the Active and Inactive Text Styles
    const determineTextStyles = (index) => {
        if (index == selectedIndex){
            return Styles.tabTextStyleActive
        }
        else{
            return Styles.tabTextStyleInactive
        }
    }



    
// --------------------------------------------------- //
//                                                     //
//                      HANDLERS                       //
//                                                     //
//v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v// 

    const handleSelection = async (index) => {
        await setSelectedIndex(index)
        await onChangeIndex(index)
    }


// --------------------------------------------------- //
//                                                     //
//                RENDERING FUNCTIONS                  //
//                                                     //
//v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v//    

    const renderTabs = () => {
        return tabsArray.map( (tab, index = 0) => {
            return(
                <Pressable onPress={() => handleSelection(index)} key={index}>
                    <View style={determineTabStyles(index)}>
                        <View>
                            <Text style={determineTextStyles(index)}>{tab}</Text>
                        </View>
                    </View>
                </Pressable>
            )
        } )
    }




// --------------------------------------------------- //
//                                                     //
//                  MAIN RENDERING                     //
//                                                     //
//v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v// 

    return(
        <View style={{...Styles.tabContainer, display: 'flex'}}>
            {renderTabs()}
        </View>
    )
}

export default TabBar