import React from 'react';
import {View, StyleSheet, ActivityIndicator } from 'react-native';

const Spinner = (props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={props.size} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default Spinner;
