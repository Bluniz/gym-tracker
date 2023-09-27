import { Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createUser, logIn } from '../../services/users';
import { useAuth } from '../../contexts/auth';
export function Home() {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Welcome</Text>
      <Button
        title='Criar usuário'
        onPress={() => {
          createUser('lucassantosrosa51@gmail.com', 'batata51', 'Lucas Rosa');
        }}
      />
      <Button
        title='Entrar'
        onPress={() => {
          logIn('lucassantosrosa51@gmail.com', 'batata51');
        }}
      />
      <Button title='Sair' onPress={signOut} />
    </View>
  );
}
