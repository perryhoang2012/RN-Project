import React from 'react';
import {Platform, TextBase, TextStyle} from 'react-native';

type CustomTextProps = {
  children?: React.ReactNode;
  size?: number;
  center?: boolean;
  weight?: string;
  color?: string;
  style?: TextStyle;
  testID?: string;
};

const CustomText = (props: CustomTextProps) => {
  const {children, size, center, weight, color, style, testID, ...rest} = props;

  const customTextStyle: any = [
    size && {fontSize: size},
    center && {textAlign: 'center'},
    weight && {
      fontWeight: weight === 'bold' && Platform.OS === 'ios' ? '500' : weight,
    },
    color && {color},

    style,
  ];
  return (
    <TextBase testID={testID} style={customTextStyle} {...rest}>
      {children}
    </TextBase>
  );
};

export default CustomText;