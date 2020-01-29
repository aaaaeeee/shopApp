import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from "@expo/vector-icons";
import Colors from '../../constants/Colors';

interface Props {
    title: string
}

const CustomHeaderButton = (props: Props) => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS === 'android' ? 'white' : Colors.primary}></HeaderButton>
}

export default CustomHeaderButton