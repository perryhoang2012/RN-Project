import {SVG_CALCULATOR} from '@assets/xml';
import Block from '@components/Block';
import Button from '@components/Button';
import CustomSvg from '@components/CustomSvg';
import CustomText from '@components/CustomText';
import Header from '@components/Header';
import SwitchCustom from '@components/SwitchCustom';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {navigate} from '@navigation/NavigationService';
import * as generalAct from '@redux/slices/GeneralState';
import {debounce} from 'lodash';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

type typeListButtonSetting = {
  title: string;
  screen?: string | null;
  icon: string | JSX.Element | JSX.Element[];
  type?: string;
};

const SettingsScreen = () => {
  const listButtonSetting: typeListButtonSetting[] = [
    {
      title: 'QR Code',
      screen: 'QRCodeScanner',
      icon: <MaterialCommunityIcons name="qrcode-scan" size={16} />,
    },
    {
      title: 'Dark Mode',
      screen: null,
      icon: <MaterialIcons name="dark-mode" size={16} />,
      type: 'dark-mode',
    },
    {
      title: 'Calculator',
      screen: 'CalculatorScreen',
      icon: <CustomSvg xml={SVG_CALCULATOR} width={20} height={20} />,
    },
  ];

  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector(state => state.general.darkMode);

  const changeStatusDarkMode = debounce(e => {
    dispatch(generalAct.setDarkMode(e));
  }, 100);

  const _renderButtonList = (item: typeListButtonSetting) => {
    return (
      <Button
        disabled={!item.screen}
        style={styles.buttonSetting}
        onPress={() => {
          if (item.screen) {
            navigate(item.screen);
          }
        }}>
        <Block style={styles.viewLeftItem}>
          {item.icon}
          <CustomText bold style={styles.titleItem}>
            {item.title}
          </CustomText>
        </Block>
        <Block>
          {item.type === 'dark-mode' ? (
            <SwitchCustom
              value={isDarkMode}
              handleChange={e => changeStatusDarkMode(e)}
            />
          ) : (
            // <Switch
            //   trackColor={{false: WHITE, true: PRIMARY}}
            //   ios_backgroundColor={WHITE}
            //   onValueChange={e => changeStatusDarkMode(e)}
            //   value={isDarkMode}
            //   style={styles.switch}
            // />
            <AntDesign name="right" size={14} />
          )}
        </Block>
      </Button>
    );
  };
  return (
    <Block style={styles.container}>
      <Header title="Settings" />
      <FlatList
        style={styles.viewFlatList}
        data={listButtonSetting}
        renderItem={({item}) => _renderButtonList(item)}
        keyExtractor={(item: typeListButtonSetting) => item.title}
      />
      <Block middle center px={10} py={10}>
        <CustomText size={16}>Ver 1.0</CustomText>
      </Block>
    </Block>
  );
};

export default SettingsScreen;
