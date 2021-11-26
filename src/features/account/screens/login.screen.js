import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../../infrastructure/theme/colors';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { Spacer } from '../../../components/spacer/spacer.component';
import { CustomText } from '../../../components/typography/text.component';
import { AccountBackground, AccountCover, AccountContainer, AuthButton, BackButton, AuthInput, Title, ErrorContainer } from '../components/account.styles';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        {error && (
          <ErrorContainer>
            <CustomText variant="error">{error}</CustomText>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {isLoading ? (
            <ActivityIndicator animating={true} color={colors.brand.primary} />
          ) : (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              dark={true}
              onPress={() => onLogin(email, password)}
            >
              Login
            </AuthButton>
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <BackButton
          mode="contained"
          dark={true}
          onPress={() => navigation.goBack()}
        >
          Back
        </BackButton>
      </Spacer>
    </AccountBackground>
  );
};