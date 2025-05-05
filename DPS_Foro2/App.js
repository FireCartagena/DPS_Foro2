import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Image, Text, TouchableWithoutFeedback, View, Keyboard, Alert } from 'react-native';
import { firebaseConfig } from './firebase-config';
import Principal from './components/Principal';
import Login from './components/Login';

const app = initializeApp(firebaseConfig);

// Crea el Drawer Navigator
const Drawer = createDrawerNavigator();

const Icon = () => {
  return (
    <Image source={require('./img/Icon.png')} style={{ width: 50, height: 50, }} />
  );
};

const Logo = () => {
  return (
    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>StoreSV</Text>
  );
};

export default function App() {

  // Ocultar el teclado
  const cerrarTeclado = () => { Keyboard.dismiss(); }

  // Estado para el inicio de sesión 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para crear cuenta
  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('cuenta creada', userCredential.user)
        Alert.alert('Cuenta creada')
        onLogin();
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Ingresa una cuenta valida')
      });
  };

  //funcion para iniciar sesion
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('sesion iniciada', userCredential.user)
        onLogin();
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Cuenta no encontrada');
      })
  }

  //cerrar sesion
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        Alert.alert('Sesion cerrada')
      })
      .catch(error => console.log(error));
  };

  //estado de inicio de sesion en true
  const onLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
          <View style={{ flex: 1 }}>
            <Login onLogin={onLogin}
              setEmail={setEmail}
              setPassword={setPassword}
              handleCreateAccount={handleCreateAccount}
              handleSignIn={handleSignIn}/>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <Drawer.Navigator screenOptions={{
          drawerStyle: {
            backgroundColor: '#98C1D9',
            borderBottomRightRadius: 20,
          },
          headerStyle: {
            backgroundColor: '#98C1D9',
          },
         headerRight: () => <CarritoIcon />,
          headerTitle: () => <Logo />,
          headerTitleAlign: 'center',
          drawerActiveTintColor: '#3D5A80',
          drawerInactiveTintColor: 'white',
          drawerLabelStyle: { fontSize: 20 },
        }}>
          <Drawer.Screen name="Inicio" component={Principal} options={{ drawerIcon: () => <Icon /> }} />
          <Drawer.Screen name="Cerrar sesión" component={handleSignOut} options={{ headerShown: false }} />
        </Drawer.Navigator>
      )}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1')}>Licencia Creative Commons</Text>
      </View>
    </NavigationContainer>
  );
}

