import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import Svg from 'react-native-svg';
import { DEFAULT_AVATAR } from '../NutonConstants';

import { Skin, Body, FacialHair, Eyes, Hair, Mouth, Nose } from '../src/Pages/Settings/AvatarSettings/components';

import { backgroundColors, facialHairColors, facialHairs, hairColors, hairs, bodyColors, bodies, skinColors, mouths, noses, eyeses } from "../src/Pages/Settings/AvatarSettings/constants/avatarColors"



function PersonasAvatar({ style, characterSettings, onNewCharacters }) {
  const [internalCharacters, setCharacters] = useState(DEFAULT_AVATAR);

  const {
    skinColor,
    hair,
    hairColor,
    body,
    bodyColor,
    facialHair,
    facialHairColor,
    eyes,
    mouth,
    nose,
    backgroundColor,
  } = characterSettings; 


  useEffect(() => {
    if (!characterSettings) {
      setCharacters({...DEFAULT_AVATAR })
    } else {
      // const components = parseCharacters(characterSettings);
      setCharacters({...characterSettings});
    }
  }, [characterSettings]);

  // const randomAvatar = useCallback(() => {
  //   const randomCharacters = {
  //     skinColor: random(Object.keys(skinColors)),
  //     hair: random(Object.keys(hairs)),
  //     hairColor: random(Object.keys(hairColors)),
  //     facialHair: random(Object.keys(facialHairs)),
  //     facialHairColor: random(Object.keys(facialHairColors)),
  //     body: random(Object.keys(bodies)),
  //     bodyColor: random(Object.keys(bodyColors)),
  //     eyes: random(Object.keys(eyeses)),
  //     mouth: random(Object.keys(mouths)),
  //     nose: random(Object.keys(noses)),
  //     backgroundColor: random(Object.keys(backgroundColors)),
  //   };
  //   const characters = combineCharacters(randomCharacters);
  //   if (onNewCharacters) {
  //     onNewCharacters(characters);
  //   }
  //   setCharacters(randomCharacters);
  // }, [onNewCharacters]);

  const containerStyle= useMemo(() => ({
    width: 200,
    height: 200,
    borderRadius: 1000,
    overflow: 'hidden',
    backgroundColor: backgroundColors[backgroundColor],
  }), [backgroundColor]);

  if (!internalCharacters) {
    return null;
  }

  return (
    <View
      style={[
        containerStyle,
        style,
      ]}
    >
      <Svg width="100%" height="100%" viewBox="0 0 64 64">
        <Body value={body} color={bodyColors[bodyColor]} />
        <Skin color={skinColors[skinColor]} />
        <Hair value={hair} color={hairColors[hairColor]} />
        <Eyes value={eyes} />
        <Mouth value={mouth} />
        <FacialHair value={facialHair} color={facialHairColors[facialHairColor]} />
        <Nose value={nose} color={skinColors[skinColor]} />
      </Svg>
    </View>
  );
}

export default PersonasAvatar;