import {View, ViewStyle} from 'react-native';
import React from 'react';
import styles from './styles';

type BlockProps = {
  children?: React.ReactNode;
  pa?: number;
  pl?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  style?: ViewStyle | ViewStyle[];
  flex?: number;
  row?: boolean;
  shadow?: boolean;
  ma?: number;
  ml?: number;
  mt?: number;
  mr?: number;
  mb?: number;
};

const Block = (props: BlockProps) => {
  const {
    children,
    pa,
    pl,
    pt,
    pr,
    pb,
    style,
    flex,
    row,
    shadow,
    ma,
    ml,
    mt,
    mr,
    mb,
    ...rest
  } = props;

  const blockStyles: any = [
    flex && {flex: flex},
    row && {flexDirection: 'row'},
    shadow && styles.shadow,
    pa && {padding: pa},
    pl && {paddingLeft: pl},
    pr && {paddingRight: pr},
    pt && {paddingTop: pt},
    pb && {paddingBottom: pb},
    ma && {margin: ma},
    ml && {marginLeft: ml},
    mr && {marginRight: mr},
    mt && {marginTop: mt},
    mb && {marginBottom: mb},
    style,
  ];

  return (
    <View style={blockStyles} {...rest}>
      {children}
    </View>
  );
};

export default Block;
