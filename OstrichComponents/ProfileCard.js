// Reaact
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet} from "react-native";
import React, {useState} from "react";



///////////////////////
///                 ///
///      Style      ///
///                 ///
///////////////////////

    const Style = StyleSheet.create({
        title: {
            fontWeight: 600,
            fontSize: 20
        },
        subTitle: {
            fontWeight: 300,
            fontSize: 14,
            color: 'grey'
        },
        image: {
            height: 50,
            width: 50,
            borderRadius: 100
        }
    })



////////// APP //////////// APP ////////// APP //////////// APP ////////// APP //////////// APP ////////// APP //////////// APP ////////// APP //////////// APP ////////// APP //////////// APP 
export default function ProfileCard({

    selectable=false,
    onSelect={function(){console.error("No onSelect prop provided!")}},

    defaultStyle={...Style},

    profilePicture=false,
    avatarComponentFunction=false,
    imageSource=false,
    imageStyle={...defaultStyle.image},

    defaultStyle=false,

    title="Title",
    titleStyle={...defaultStyle.title},
    subTitle="Subtitle",
    subTitleStyle={...defaultStyle.subTitle}

}) {

//////////////////////
///                 ///
///    Renderings   ///
///                 ///
///////////////////////

    // Renders the barebones of the card, Selectable or Not
    function renderSelectable(){
        if (!selectable){
            renderTwoOrOneLayer()
        }
        if (selectable){
            return(
                <TouchableOpacity
                    onPress={() => onSelect()}
                >
                    {renderTwoOrOneLayer}
                </TouchableOpacity>
            )
        }
    }

    // Determines the Type of ProfileCard
    function renderTwoOrOneLayer(){
        if (oneLayer){
            return(
                <View style={{display: 'flex', flexDirection: 'row'}}>

                    {/* Image */}
                    <View style={{flex: 4}}>

                    </View>
                    {/* Content */}
                    <View style={{flex: 7}}>
                        {renderLayerOne()}
                    </View>
                </View>
            )
        }   
        else{
            return(
                <View style={{display: 'flex', flexDirection: 'column'}}>

                    {/* Image */}
                    <View style={{flex: 4}}>

                    </View>

                    {/* Content */}
                    <View style={{flex: 7}}>

                        {/* Both Layers */}
                        <View style={{flex: 6}}>
                            {renderLayerOne()}
                        </View>
                        <View style={{flex: 3}}>
                            {renderLayerTwo()}
                        </View>
                    </View>

                </View>
            )
        }
    }

    // Renders either a Profile Avatar or Profile Picture
    function renderProfilePicture(){
        if (!profilePicture){
            return avatarComponentFunction()
            .catch(err => {
                console.error("There was an issue with the avatarComponentFunction. Please make sure what you entered is the declaration for a function that returns an avatar component. The error returned is as follows...", err)
            })
        }
        else{
            return(
                <Image
                    source={imageSource}
                    style={...imageStyle}
                />
            )
        }
    }

    // Renders Top Layer
    function renderLayerOne(){
        return(
            <>
                <Text style={{...titleStyle}}>{title}</Text>
            </>
        )
    }

    // Renders Bottom Layer
    function renderLayerTwo(){
        return(
            <>
                <Text style={{...subTitleStyle}}>{subTitle}</Text>
            </>
        )
    }


///////////////////////
///                 ///
///     Handlers    ///
///                 ///
///////////////////////


///////////////////////
///                 ///
///    Main Render  ///
///                 ///
///////////////////////
    return(
       <View>
        
       </View>
    )
}