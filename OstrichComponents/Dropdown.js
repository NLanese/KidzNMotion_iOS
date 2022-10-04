// Reaact
import { View, Text, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState} from "react";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";


///////////////////////
///                 ///
///      Style      ///
///                 ///
///////////////////////

    const Styles = StyleSheet.create({
        dropDownButton: {
            borderColor: 'black', borderWidth: 1, borderRadius: 10,
            backgroundColor: 'white'
        },

        searchStyle: {
            backgroundColor: 'white'
        },

        searchBarStyle: {
            paddingTop: 3, paddingBottom: 3, 
            paddingLeft: 5, paddingRight: 5,
            backgroundColor: 'white'
        },

        index: {
            backgroundColor: 'white',
            borderColor: 'black', 
            borderLeftWidth: 1, borderRightWidth: 1,
            borderTopWidth: 0.5, borderBottomWidth: 0.5, 
            zIndex: 2,
            width: '96%',
            marginLeft: '2%'
        },

        indexText: {
            fontSize: 16,
            fontWeight: 500
        },

        scrollViewStyle: {
            marginBottom: 10,
            backgroundColor: 'white',
            zIndex: 1,
        },

        titleStyle: {
            fontSize: 20,
            fontWeight: 500
        }

    })


export default function Dropdown({
    title="Untitled",                           // Main Button Text
    titleStyle={...Styles.titleStyle},          // Main Button Text Style

    onTitleClick={function(object){console.log("No function assigned")}},

    indexText={...Styles.indexText},            // Index Button Text
    selectedIndexText={...Styles.indexText},    // Index ButtonText when Selected

    initialHeight=40,                           // Main Button Height Closed
    openedHeight=40,                            // Main Button Height Opened

    initialStyle={...Styles.dropDownButton},     // Main Button Style Closed 
    openedTitleStyle={...Styles.dropDownButton}, // Main Button Style Open 

    dropScrollStyle={...Styles.scrollViewStyle}, // The ScrollView Style
    scrollListHeight=100,                        // The ScrollView Height

    dropArray=[],                               // The Array of objects or values that will be dropdown items
    dropTitleProp=false,                        // If the array has objects, this will be the prop that is rendered and used to filter

    dropIndexHeight=50,                         // Each Dropdown Item's height
    dropIndexStyle={...Styles.index},           // Each Dropdown Item's style
    selectedDropStyle={...Styles.index},        // Each Dropdown Item's style Selected

    buttonColor='#FFF',                         // Title button color
    indexColor="#FFF",                          // Dropdown item color
    selectedIndexColor="coral",                  // Dropdown item color Selected

    onIndexClick={function(object){console.log("No function assigned")}},       // Function on Dropdown Item click

    search=false,                               // Boolean to toggle searchbar
    searchStyle={...Styles.searchStyle},        // Searchbar View Style
    searchBarStyle={...Styles.searchBarStyle}   // Searchbar Inout Style
}){
///////////////////////
///                 ///
///   Preliminary   ///
///                 ///
///////////////////////

    /////////////////
    // Local State //
    /////////////////

        const [open, setOpen] = useState(false)

        const [text, setText] = useState(false)

        const [selected, setSelected] = useState([])

///////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the Button, while unclicked
    function renderInitialButton(open){
        let arrow = "V"
        let display = initialStyle
        let height = initialHeight
        if (open){
            arrow="^"
            display = openedTitleStyle
            height = openedHeight
        }
        return(
            <TouchableOpacity 
                style={{backgroundColor: buttonColor, height: height, ...display }}
                onPress={() => {
                    onTitleClick()
                    setOpen(!open)}
                }
            >
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>

                    {/* Title */}
                    <View style={{flex: 7, marginLeft: 10, justifyContent: 'center',}}>
                        <Text style={{textAlign: 'left', ...titleStyle}}>{title}</Text>
                    </View>

                    {/* Open Indicator */}
                    <View style={{justifyContent: 'flex-end', flex: 1}}>
                        <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>{arrow}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    // Renders each index as an individual index tab
    function renderOpenButton(){
        return(
            <View>

                {/* Open Button */}
               {renderInitialButton(true)}

                {/* Search Bar */}
                {renderSearchBar()}

                {/* List */}
                <View>
                    <ScrollView style={{height: scrollListHeight, ...dropScrollStyle}}>
                        {renderAllIndices()}
                    </ScrollView>
                </View>
            </View>
        )
    }

    // Renders all of the individual Indicies
    function renderAllIndices(){
        return dropArray.map((index, i) => {
            return renderIndex(index, i)
        })
    }

    // Renders a single dropdown index
    function renderIndex(object, i){
        let value = object
        if (dropTitleProp){
            value = object[dropTitleProp]
        }
        return(
            <TouchableOpacity 
            onPress={() => handleIndexClick(object, i)} 
            key={i} 
            style={{...determineIndexStyle(i), height: dropIndexHeight, alignItems: 'center', justifyContent: 'center'}}>   
                <Text style={{textAlign: 'center', textAlignVertical: 'center', ...indexText}}>{value}</Text>
            </TouchableOpacity>
        )
    }

    // Renders the (optional) search bar
    function renderSearchBar(){
        if (search){
            return(
                <View style={{paddingTop: 5, ...searchStyle}}>
                    <TextInput style={searchBarStyle}
                        placeholder={"Search"}
                        onChangeText={(content) => handleSearchInput(content)}
                    />
                </View>
            )
        }
    }

    function MAIN(){
        if (open){
            return renderOpenButton()
        }
        else{
            return renderInitialButton()
        }
    }


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////

    function handleSearchInput(content){
        setText(content)
    }

    // Filters the Array based on the search input
    function filterArray(array){
        return array.filter( (index, i) => {
            if (dropTitleProp){
                if (object.dropTitleProp === text || object.dropTitleProp.includes(text)){
                    return index
                }
            }
            else{
                if (object === text || object.includes(text)){
                    return index
                }
            }
        })
    }

    function determineIndexStyle(index){
        if (selected.includes(index)){
            return {...selectedDropStyle, backgroundColor: selectedIndexColor}
        }
        else{
            return {...dropIndexStyle, backgroundColor: indexColor}
        }
    }

    // Adds the index to selected state and fires the prop function
    function handleIndexClick(object, index){
        handleSelection(index).then(() => {
            // onIndexClick({value: object, selected: isSelected(index)})
            onIndexClick(object)
        })
    }

   async function handleSelection(index){
        if (selected.includes(index)){
            return await setSelected([
                ...selected.filter( selIndex => {
                    if (selIndex !== index){
                        return selIndex
                    }
                })
            ])
        }
        else{
            let newArr = ([...selected, index])
            return await setSelected(newArr)
        }
    }

    function isSelected(index){
        if (selected.includes(index)){
            return true 
        }
        else {
            return false
        }
    }

///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return MAIN()
} 