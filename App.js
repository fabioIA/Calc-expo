import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, button, SwipeableListView } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const [currentNumber,  setCurrentNumber] = useState("")
  const [scurrentNumber,  setScurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")
  const [parent, setParent] = useState("")
  const [zero, setZero] = useState("")
  const [negativo, setNegativo] = useState("")
  const [atual, setAtual] = useState("")

  var u
  u = 0

  function calculador(){
    setScurrentNumber(currentNumber)
    const splitNumbers = currentNumber.split(' ') 
    const corta = []
    var i, j, p, z, f, q, ad, su, re, a, y, ligado, c

    for(c = 0;c <= splitNumbers.length ;c++){
      if(splitNumbers[c] === ""){
        splitNumbers.splice(c, 1)
        c --
      }
    }

    ad = 0
    su = 0

    for(p = 0;p <= splitNumbers.length; p++){
      if(splitNumbers[p] === "("){
        ad ++
      }else if(splitNumbers[p] === ")"){
        su ++
      }
    }

    if(splitNumbers.length === 1){
      return
    }else{
      parenteses()
    }
    function parenteses(){
      i = 0
      for(a = 0;a <= splitNumbers.length ;a++){
        ligado = 0
        re = -999
        if(splitNumbers[i] === "("){
          ad = 0
          su = 0
          for(p = 0;p <= splitNumbers.length; p++){
            if(splitNumbers[p] === "("){
              ad ++
            }else if(splitNumbers[p] === ")"){
              su ++
            }
            if(re < ad - su){
              re = ad - su
              z = p
            }
          }
          f = 0
          z ++
          for(j = z;splitNumbers[j] !== ")" && j < splitNumbers.length; j++){
              corta[f] = splitNumbers[j]
              f++
          }
          console.log(splitNumbers)
          splitNumbers[z-1] = resolve(corta)
          i = -1

          for(q = 0; q <= f;q++){
            splitNumbers.splice(z, 1)
          }
        }
        i++
      }

      for(y = 0;y <= splitNumbers.length ;y++){
        if(splitNumbers[y] === "("){
          ligado = 1
        }
      }
      if(ligado === 1){
        parenteses()
      }else{
        for(y = 0; y < splitNumbers.length; y++){
          if(splitNumbers[y] === ")"){
            splitNumbers.splice(y, 1)
            y = -1
          }
        }
      }
      while(splitNumbers.length > 1){
        resolve(splitNumbers)
        if(splitNumbers[splitNumbers.length - 1] === "+" | splitNumbers[splitNumbers.length - 1] === "-" | splitNumbers[splitNumbers.length - 1] === "x" | splitNumbers[splitNumbers.length - 1] === "/" | splitNumbers[splitNumbers.length - 1] === "^" | splitNumbers[splitNumbers.length - 1] === "√"){
          splitNumbers.splice(splitNumbers.length - 1, 1)
        }
      }
      setAtual(splitNumbers)
    }

    function resolve(splitNumbers){
      for(i = 0; i <= splitNumbers.length; i++){
        if(splitNumbers[i] === "%"){
          if(i > 2 && !isNaN(splitNumbers[i-3])){
            if(splitNumbers[i-2] === "-"){
              splitNumbers[i-1] = splitNumbers[i-3] * splitNumbers[i-1] / 100
              splitNumbers.splice(i, 1)
              i = -1
            }else if(splitNumbers[i-2] === "+"){
              splitNumbers[i-1] = splitNumbers[i-3] * splitNumbers[i-1] / 100
              splitNumbers.splice(i, 1)
              i = -1
            }
          }else if(!isNaN((splitNumbers[i-1]).toString())){
            splitNumbers[i-1] = parseFloat(splitNumbers[i-1]) / 100
            splitNumbers.splice(i, 1)
            i = -1
          }
        }
      }
      for(i = 0; i <= splitNumbers.length; i++){
        if(splitNumbers[i] === "^"){
          if(!isNaN((splitNumbers[i-1]).toString()) && !isNaN((splitNumbers[i+1].toString()))){
            splitNumbers[i] = parseFloat(splitNumbers[i-1]) ** parseFloat(splitNumbers[i+1])
            splitNumbers.splice(i-1, 1)
            splitNumbers.splice(i, 1)
            i = -1
          }
        }else if(splitNumbers[i] === "√"){
          if(!isNaN((splitNumbers[i+1].toString()))){
            splitNumbers[i] = parseFloat(Math.sqrt(splitNumbers[i+1]))
            splitNumbers.splice(i+1, 1)
            i = -1
          }
        }
      }
      for(i = 0; i < splitNumbers.length; i++){
          if(splitNumbers[i] === "x"){
            if(!isNaN(splitNumbers[i-1]) && !isNaN(splitNumbers[i+1])){
              splitNumbers[i] = parseFloat(splitNumbers[i-1]) * parseFloat(splitNumbers[i+1])
              splitNumbers.splice(i-1, 1)
              splitNumbers.splice(i, 1)
              i = -1
            }
          }else if(!isNaN(splitNumbers[i]) && !isNaN(splitNumbers[i+1])){
            splitNumbers[i] = parseFloat(splitNumbers[i]) * parseFloat(splitNumbers[i+1])
            splitNumbers.splice(i+1, 1)
            console.log(i)
            i = -1
          }else if(splitNumbers[i] === "/"){
            if(!isNaN(splitNumbers[i-1]) && !isNaN(splitNumbers[i+1])){
              splitNumbers[i] = parseFloat(splitNumbers[i-1]) / parseFloat(splitNumbers[i+1])
              splitNumbers.splice(i-1, 1)
              splitNumbers.splice(i, 1)
              i = -1
            }
          }
        }
      for(i = 0; i <= splitNumbers.length; i++){
        if(splitNumbers[i] === "+"){
          if(splitNumbers[i] === splitNumbers[0]){
            splitNumbers[i] = 0 + parseFloat(splitNumbers[i+1])
            splitNumbers.splice(i+1, 1)
            i = -1
          }else if(!isNaN(splitNumbers[i-1]) && !isNaN(splitNumbers[i+1])){
              splitNumbers[i] = parseFloat(splitNumbers[i-1]) + parseFloat(splitNumbers[i+1])
              splitNumbers.splice(i-1, 1)
              splitNumbers.splice(i, 1)
              i = -1
            }
        }else if(splitNumbers[i] === "-"){
          if(splitNumbers[i] === splitNumbers[0]){
            splitNumbers[i] = 0 - parseFloat(splitNumbers[i+1])
            splitNumbers.splice(i+1, 1)
            i = -1
          }else if(isNaN(splitNumbers[i-1]) && !isNaN(splitNumbers[i+1])){
            splitNumbers[i] = 0 - parseFloat(splitNumbers[i+1])
            splitNumbers.splice(i+1, 1)
            i = -1
          }else if(!isNaN(splitNumbers[i-1]) && !isNaN(splitNumbers[i+1])){
              splitNumbers[i] = parseFloat(splitNumbers[i-1]) - parseFloat(splitNumbers[i+1])
              splitNumbers.splice(i-1, 1)
              splitNumbers.splice(i, 1)
              i = -1
            }
        }
      }
      return parseFloat(splitNumbers)
    }
  }

  function Input(buttonPressed){
    if(currentNumber[currentNumber.length - 2] === "+" | currentNumber[currentNumber.length - 2] === "x" | currentNumber[currentNumber.length -2] === "/" | currentNumber[currentNumber.length - 2] === "^" | currentNumber[currentNumber.length - 2] === "√" | currentNumber[currentNumber.length - 2] === "%"){
      if(buttonPressed === "+" | buttonPressed === "x" | buttonPressed === "/" | buttonPressed === "^" | buttonPressed === "√" | buttonPressed === "%"){
        return
      }else if(buttonPressed === "-"){
        setCurrentNumber(currentNumber + " - ")
        return
      }
    }else if(currentNumber[currentNumber.length - 2] === "-" && buttonPressed === "-" | buttonPressed === "+" | buttonPressed === "x" | buttonPressed === "/" | buttonPressed === "^" | buttonPressed === "√" | buttonPressed === "%"){
      return
    }else if(atual !== "" && buttonPressed === "=" && currentNumber === scurrentNumber){
      setCurrentNumber(" " + atual)
      setAtual("")
      return
    }else if(currentNumber === '' && buttonPressed === "x" | buttonPressed === "/" | buttonPressed === "^" | buttonPressed === "%"){
      setCurrentNumber("0 " + buttonPressed + " ")
      return
    }else if(currentNumber[currentNumber.length - 2] !== "-" && buttonPressed === "+" | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/" | buttonPressed === "^" | buttonPressed === "√" | buttonPressed === "%"){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
    return
    }
    
    switch(buttonPressed){
      case "DEL":
        if(currentNumber[currentNumber.length - 1] === " "){
          setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 2)))
        }else{
          setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        }
        return
      case "AC":
        setLastNumber("")
        setCurrentNumber("")
        setAtual("")
        return
      case "=":
        setLastNumber(currentNumber + " = ")
        calculador()
        return
      case "(":
        setCurrentNumber(currentNumber + " " + buttonPressed + " ")
        setParent(")")
        return
      case ")":
        setCurrentNumber(currentNumber + " " + buttonPressed + " ")
        setParent("")
        setNegativo("")
        return
      case "- (":
        setCurrentNumber(currentNumber + " " + buttonPressed + " ")
        setNegativo("n")
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 5,
      paddingVertical: 15,
      marginTop: 20,
      alignItems: "center",
    },
    Form: {
      height: 90,
      flexDirection: "row",
      borderColor: "#eee",
      backgroundColor: "#111120",
      alignItems: "center",
    },
    Form2: {
      height: 65,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    Menu: {
      marginTop: 40,
      marginLeft: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    Histo: {
      marginTop: 40,
      marginLeft: 265,
      alignItems: "center",
      justifyContent: "center",
    },
    Dots: {
      marginTop: 40,
      marginLeft: 17,
      alignItems: "center",
      justifyContent: "center",
    },
    Body: {
      flex: 1,
    },
    buttons: {
      marginTop: 5,
      backgroundColor: "#f5f5f5",
      borderRadius: 3,
      alignItems: "center",
      padding: 5,
      height: 400,
      flexDirection: "row", 
    },
    button: {
      margin: 2,
      backgroundColor: "#e0efee",
      width: 81.5,
      height: 73.5,
      border: 1,
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
    },
    Out: {
      height: 230,
      width: 340, 
      backgroundColor: "#f5f5f5",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      borderRadius: 6,
    },
    OutText: {
      margintop: 10,
      marginRight: 10,
      fontSize: 40,
      fontWeight: "bold",
    },
    HistoricText: {
      color: "#7c7c7c",
      margin: 5,
      fontSize: 30,
    },

    Delete: {
      marginTop: 15,
      marginLeft: 130,
      alignItems: "center",
      justifyContent: "center",
    },

    Menu2: {
      backgroundColor: "#000",
    }
  });

  return (
    <>
    <View style={styles.Form}>
      <TouchableOpacity style={styles.Menu}>
        <MaterialCommunityIcons name="menu" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.Histo}>
        <MaterialCommunityIcons name="clock-check-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.Dots}>
        <MaterialCommunityIcons name="dots-vertical" size={28} color="white" />
      </TouchableOpacity>
    </View>
    <View style={styles.container}>
      <View style={styles.Out}>
        <Text style={styles.HistoricText}>{lastNumber}</Text>
        {currentNumber === "" ?
          <Text style={styles.OutText}>0</Text>
          :
          <Text style={styles.OutText}>{currentNumber}</Text>
        }
        <Text style={{margin: 10, fontSize: 40, color: "grey"}}>={atual}</Text>
      </View>
      <View style={styles.Form2}>
        
        <TouchableOpacity onPress={() => Input("(")}>
          <Text style={[{fontWeight: "bold", fontSize: 45, marginLeft: 10}]}>(</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Input(")")}>
          <Text style={[{fontWeight: "bold", fontSize: 45, marginLeft: 50}]}>)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Input("%")}>
          <MaterialCommunityIcons style={{marginTop: 15, marginLeft: 25}} name="percent-outline" size={45} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Delete} onPress={() => Input("DEL")}>
          <Feather name="delete" size={40} color="black" />
        </TouchableOpacity> 
      </View>
      <View style={styles.buttons}>
          <View>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input("AC")}>
              <MaterialCommunityIcons name="alpha-c" size={60} color="#0000a4" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(1)}>
              <MaterialCommunityIcons name="numeric-1" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(4)}>
              <MaterialCommunityIcons name="numeric-4" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(7)}>
              <MaterialCommunityIcons name="numeric-7" size={50} color="black" />
            </TouchableOpacity>
            {negativo === "" ?
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input("")}>
              <MaterialCommunityIcons name="arrange-send-to-back" size={35} color="black" />
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input(")")}>
              <MaterialCommunityIcons name="arrange-send-to-back" size={35} color="black" />
            </TouchableOpacity>
            }
          </View>
          <View>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input("√")}>
              <MaterialCommunityIcons name="square-root" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(2)}>
              <MaterialCommunityIcons name="numeric-2" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(5)}>
              <MaterialCommunityIcons name="numeric-5" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(8)}>
              <MaterialCommunityIcons name="numeric-8" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(0)}>
              <MaterialCommunityIcons name="numeric-0" size={50} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input("^")}>
              <MaterialCommunityIcons name="exponent" size={45} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(3)}>
              <MaterialCommunityIcons name="numeric-3" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(6)}>
              <MaterialCommunityIcons name="numeric-6" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={() => Input(9)}>
              <MaterialCommunityIcons name="numeric-9" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input(".")}>
              <MaterialCommunityIcons name="comma" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input("/")}>
              <MaterialCommunityIcons name="division" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input("x")}>
              <Feather name="x" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input("-")}>
              <AntDesign name="minus" size={45} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#ededed"}]} onPress={() => Input("+")}>
              <AntDesign name="plus" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#9DBC7B"}]} onPress={() => Input("=")}>
              <MaterialCommunityIcons name="equal" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
    </View>
    </>
  );
}