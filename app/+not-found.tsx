import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function About() {
  return (
    <>
    <Stack.Screen options={{title:'opp Not Found'}}/>
    <View
      style={style.container}
    >
      <Text style={style.Text}>No existe esta Page </Text>
      <Link href={"/(tabs)"} style={style.bottom}>Volver </Link>
    </View>
    
    
    
    </>
  );
}

const style = StyleSheet.create({
  container:{
flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'black'
  },
 
 Text:{
  color:'#fff'
 } ,

  bottom:{
    fontSize:20,
    textDecorationLine:'underline',
    color:'#fff'
  }
})