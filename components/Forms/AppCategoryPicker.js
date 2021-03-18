import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Modal, ActivityIndicator, ScrollView } from 'react-native'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { useFormikContext } from 'formik'


import AppText from '../AppText'
import useFetchData from '../../hooks/useFetchData'
import { GlobalStyles } from '../../styles/GlobalStyles';
import { FlatList } from 'react-native';
import FillerIcon from '../FillerIcon';
import CategoryPickerComponent from '../CategoryPickerComponent';


const url = `api/categories/`


const AppCategoryPicker = ({name, authToken}) => {

    const [ isOpen, setIsOpen ] = useState(false);

    const [ categoryName, setCategoryName ] = useState("Pick a category")

    const { errors, touched,  setFieldValue, values } = useFormikContext()

    const token = authToken;
  
    const { data, request, loading, errors: fetchErrors } = useFetchData(token, url)

    useEffect(() => {
        request()
    },[])
    

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const getCategoryName = (category) => {
        setFieldValue(name, category.id)
        setCategoryName(category.name)
    }

    return (
        <>
            <Modal visible={isOpen} >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={closeModal}>
                            <AntDesign name="close" size={25} color="black" />
                        </TouchableOpacity>
                    </View>

                    {
                        loading && <ActivityIndicator size={18} color={GlobalStyles.themeColor.color} />
                    }
                    <FlatList 
                        data={data.results}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.categoryListContainer}>
                                <CategoryPickerComponent 
                                    item={item} 
                                    getCategoryName={getCategoryName}
                                    closeModal={closeModal}
                                    />
                            </View>
                            ) 
                        }
                    /> 
            </Modal>

            <TouchableOpacity style={styles.container} onPress={openModal}>
                <MaterialCommunityIcons name="apps" size={20} style={styles.icon} /> 
                <AppText color="#777">{categoryName}</AppText>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    categoryListContainer: {
        borderRadius: 15,
        padding: 3,
        marginTop: 15,
        margin: 8,
    
      },
    container: {
        alignItems: 'center',
        borderColor: "#ddd",
        borderRadius: 12,
        borderWidth: 0.9,
        flexDirection: 'row',
        paddingHorizontal: 12,
        height: 35,
        marginVertical: 12,
        width: "100%"
    },
    icon: {
        marginRight: 12,
        color: "#2C3335"
    },
    header: {
        padding: 15
    },
    modalContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
    }
})

const mapStateToProps = state => {
    return{
      authToken: state.auth.token
    }
  }

export default connect(mapStateToProps, null)(AppCategoryPicker)
