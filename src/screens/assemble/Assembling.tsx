import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { Icons } from '../../assets/icons';
import { navigate } from '../../navigation';
import { styles } from './index';

export const Assembling = () => {
  const finishAssembly = () => {
    navigate('mint');
  };

  const [options] = useState([
    {
      name: 'Create a Note',
      icon: <Icons.note color={'#F3B421'} size={30} />,
      color: '#F3B421',
    },
    {
      name: 'Record Audio',
      icon: <Icons.audio color={'red'} size={30} />,
      color: 'red',
    },
    {
      name: 'Add Photo/Video',
      icon: <Icons.camera color={'magenta'} size={30} />,
      color: 'magenta',
    },
  ]);

  return (
    <View style={styles.assembleContainer}>
      <View style={styles.assemblyTitleContainer}>
        <Text style={styles.assemblyTitle}>clever-octopus</Text>
        <TouchableOpacity>
          <Icons.edit color='darkgray' size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity style={{ ...styles.optionContainer, borderColor: option.color }}>
            {option.icon}
            <Text style={styles.optionTitle}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <PrimaryButton onPress={finishAssembly}>Finish</PrimaryButton>
      <TouchableOpacity style={styles.leaveButton}>
        <Text style={styles.leaveButtonText}>Leave Assembly</Text>
      </TouchableOpacity>
    </View>
  );
};
