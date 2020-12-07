import React, { useEffect, useState, useContext } from 'react';
import { validateAll } from 'indicative/validator';
import { View, Text } from 'react-native';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';

import { AuthContext } from '../../utils/authContext';

const SignInScreen = ({ navigation }) => {
    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});

    const { signIn, signUp } = useContext(AuthContext);

    const handleSignIn = () => {
        // https://indicative.adonisjs.com
        const rules = {
            email: 'required|email',
            password: 'required|string|min:6|max:40'
        };

        const data = {
            email: emailAddress,
            password: password
        };

        const messages = {
            required: field => `${field} is required`,
            'username.alpha': 'Username contains unallowed characters',
            'email.email': 'Please enter a valid email address',
            'password.min': 'Wrong Password?'
        };

        validateAll(data, rules, messages)
            .then(() => {
                console.log('success sign in');
                signIn({ emailAddress, password });
            })
            .catch(err => {
                const formatError = {};
                err.forEach(err => {
                    formatError[err.field] = err.message;
                });
                setSignUpErrors(formatError);
            });
    };

    return (
        <View>
            <Card>
                <Input
                    label={'Email'}
                    placeholder="Email"
                    value={emailAddress}
                    onChangeText={setemailAddress}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.email : null}
                />
                <View style={{height:20}}></View>
                <Input
                    label={'Password'}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.password : null}
                />
                <Button
                    buttonStyle={{ margin: 10, marginTop: 30, backgroundColor:"red" }}
                    title="Sign in"
                    onPress={() => handleSignIn()}
                />
                <Text style={{ marginLeft: "17%" }} onPress={() => signUp()}>
                    Don't have an account? Sign Up
                </Text>
            </Card>
        </View>
    );
};

export default SignInScreen;
