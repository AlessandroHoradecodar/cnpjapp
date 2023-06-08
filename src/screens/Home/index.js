import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressArea,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [cnpj, setCNPJ] = useState('');
    const [address, setAddress] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`${cnpj}`);

           // console.log(data)

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um CNPJ válido.');
            } else {
                setAddress(data);
            }

        } catch (error) {
            console.log(error)
            Alert.alert('Buscar', 'Digite um CNPJ válido');
        }
    };

    async function handleLimpar() {
        setAddress(null);
        setCNPJ('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!address &&
                    <Input
                        keyboardType="numeric"
                        maxLength={14}
                        onChangeText={setCNPJ}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o CNPJ que deseja buscar"
                        placeholderTextColor="#2F48D4"
                        value={cnpj}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={address ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {address ? 'Limpar' : 'Buscar!'}
                    </ButtonText>
                </Button>
            </Animation>
/
            {address &&
                <AddressArea>
                    <Text>CNPJ: {cnpj}</Text>
                    <Text>Nome: {address.nome_fantasia}</Text>
                    <Text>RazaoSocial: {address.razao_socia}</Text>
                    <Text>cnae fiscal: {address.cnae_fiscal}</Text>
                    <Text>Status: {address.situacao_cadastral}</Text>
                    <Text>Data: {address.data_inicio_atividade}</Text>
                </AddressArea>
            }
        </Container>
    );
}