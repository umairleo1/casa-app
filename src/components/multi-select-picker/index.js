import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'src/utils/themes/global-colors';


const MultiSelectPicker = ({multiSelect,setMultiSelect,data}) => {

    const renderDataItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Multi Select item"
                value={multiSelect}
                search
                searchPlaceholder="Search..."
                onChange={setMultiSelect}
                // renderLeftIcon={() => (
                //     <AntDesign
                //         style={styles.icon}
                //         color="black"
                //         name="Safety"
                //         size={20}
                //     />
                // )}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                            <AntDesign color="black" name="delete" size={15} />
                        </View>
                    </TouchableOpacity>
                )}
            />
            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    dropdown: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth:1,
        borderColor:colors.placeholderColor,
        padding: 12,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:3,
        borderWidth:1,
        borderColor: colors.placeholderColor,
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
});

export default MultiSelectPicker;