import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';

const Login = ({ onLogin, setEmail, setPassword, handleCreateAccount, handleSignIn, }) =>{

    return(
        <View style={styles.container}>

            <View>
                <Text style={styles.name}>StoreSV</Text>
            </View>

<View>
<Text style={styles.label}>Email:</Text>
<TextInput onChangeText={(text) => setEmail(text)} placeholder='Email' style={styles.input} />
</View>

<View>
<Text style={styles.label}>Contraseña:</Text>
<TextInput onChangeText={(text) => setPassword(text)} placeholder='Contraseña' secureTextEntry={true} style={styles.input} />
</View>

<View>
<TouchableOpacity onPress={handleSignIn} style={styles.btnSubmitI} >
<Text style={styles.textoSubmit}>Iniciar</Text>
</TouchableOpacity>
</View>

<View>
<TouchableOpacity onPress={handleCreateAccount} style={styles.btnSubmitR}>
<Text style={styles.textoSubmit}>Crear Cuenta</Text>
</TouchableOpacity>
</View>

<View>
<TouchableOpacity style={styles.btn}>
<View style={styles.cont}>
    <Image source={require('../img/Lgoogle.png')} style={styles.img}/>
<Text style={styles.texto}>Iniciar con Google</Text>
</View>
</TouchableOpacity>
</View>

</View>
);
}

export default Login 

const styles = StyleSheet.create({

    name:{
        fontSize: 40,
        fontWeight: '900',
        textAlign: 'center',
        marginTop: '15%',
        padding: 10,
        color: '#98C1D9',
    },

    cont: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      img: {
        width: 30,
        height: 30,
        marginRight: 10,
        marginLeft:80
      },

    container: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
        },
        label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
        },
        input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5
        },
        btnSubmitI: {
        padding: 10,
        backgroundColor: '#3aacf0',
        marginTop: 50,
        borderRadius: 10,
        },
        btnSubmitR: {
            padding: 10,
            backgroundColor: '#2d49a6',
            marginVertical: 30,
            borderRadius: 10,
            },

            btn: {
                padding: 10,
                backgroundColor: '#d2e2fc',
                marginVertical: 5,
                borderRadius: 10,
                },    

texto: {
        padding: 5,
        fontSize: 15
        },

        textoSubmit: {
        color: '#FFF',
        padding: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
        }
        
})