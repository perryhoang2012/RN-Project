import {WHITE} from '@assets/colors';
import {SVG_FACEBOOK, SVG_GOOGLE} from '@assets/xml';
import Block from '@components/Block';
import Button from '@components/Button';
import CustomInput from '@components/CustomInput';
import CustomSvg from '@components/CustomSvg';
import CustomText from '@components/CustomText';
import {useAppDispatch} from '@hooks/useRedux';
import {useSafeAreaInsetsCustom} from '@hooks/useSafeAreaInsetsCustom';
import {navigate} from '@navigation/NavigationService';
import * as generalAct from '@redux/slices/GeneralState';
import {toast} from '@utils/ToastHelper';
import React, {useCallback, useState} from 'react';
import styles from './styles';

type LoginStateType = {
  email: string;
  password: string;
};
const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<LoginStateType>({
    email: '',
    password: '',
  });

  const onSubmitLogin = useCallback(() => {
    dispatch(generalAct.setLoading(true));
    setTimeout(() => {
      try {
        if (state.email === 'admin' && state.password === 'admin') {
          toast('login successful');
          dispatch(generalAct.setLoading(false));
          navigate('BottomTab');
        } else {
          toast('wrong login', 'error');
          dispatch(generalAct.setLoading(false));
        }
      } catch (e) {
        toast('wrong login', 'error');
        dispatch(generalAct.setLoading(false));
      }
    }, 5000);
  }, [dispatch, state.password, state.email]);

  const goToSignUpScreen = () => {
    navigate('SignUp');
  };

  return (
    <Block style={styles.container}>
      <Block style={[styles.body, {marginTop: useSafeAreaInsetsCustom().top}]}>
        <Block flex middle center>
          <CustomText testID={'testText'} style={styles.textTitle}>
            Log In
          </CustomText>
        </Block>
        <Block flex={2} center>
          <CustomInput
            style={styles.inputLogin}
            label="Email"
            value={state.email}
            onChange={e => setState({...state, email: e})}
          />

          <CustomInput
            style={styles.inputLogin}
            label="Password"
            value={state.password}
            onChange={e => setState({...state, password: e})}
            isPassword={true}
          />
          <Button style={styles.buttonLogin} onPress={() => onSubmitLogin()}>
            <CustomText style={styles.titleButtonLogin}>Login</CustomText>
          </Button>
          <Button style={{marginTop: 12}}>
            <CustomText style={styles.textUnderline}>
              Forgot password?
            </CustomText>
          </Button>
        </Block>
        <Block flex middle center style={{}}>
          <CustomText>Login with</CustomText>
          <Block row mt={17} style={styles.viewButtonSocial}>
            <Button style={styles.buttonSocial}>
              <CustomText size={16} weight="700" color={WHITE}>
                Facebook
              </CustomText>
              <CustomSvg xml={SVG_FACEBOOK} width={20} height={20} />
            </Button>
            <Button style={styles.buttonSocial}>
              <CustomText size={16} weight="700" color={WHITE}>
                Google
              </CustomText>
              <CustomSvg xml={SVG_GOOGLE} width={20} height={20} />
            </Button>
          </Block>
        </Block>

        <Block flex middle center>
          <Button onPress={() => goToSignUpScreen()}>
            <CustomText style={styles.textUnderline}>
              Dont have and account? Sign Up
            </CustomText>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default LoginScreen;
