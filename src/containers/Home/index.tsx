import React, { useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

// Actions
import { requestLocation } from './actions';
import { ListView, SearchBar } from '@ant-design/react-native';
import { Text } from '@rneui/themed';
import WebView from 'react-native-webview';

const Home = () => {
  const dispatch = useDispatch();

  const { loading, location} = useSelector((store: any) => store.home);
  const [searchText, setSearchText] = useState('');
  const [mapUrl, setMapUrl] = useState('https://www.openstreetmap.org/search?query=malaysia');
  const [searchArray, setSearchArray] = useState(['']);

  var rowData = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  var searchData: string[] | any[] = []

  const [initialElements, changeEl]  = useState(searchData);

  const [exampleState, setExampleState] = useState(initialElements);

  const handleOnSearch = () => {
    dispatch(requestLocation(searchText));
  };

  const onChange = (value: string) => {
    setSearchText(value);
    handleAutoComplete(value);
  }

  const clear = () => {
    setSearchText('');
    dispatch(requestLocation(''));
  }

  const state = {
    layout: 'list',
  }

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity onPress={() => {
          setMapUrl('https://www.openstreetmap.org/search?query=' + item);
          setSearchText(item);
          dispatch(requestLocation(item));
          setExampleState([]);
        }}>
        <View style={styles.listItem}>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const handleAutoComplete = async(search: string) => {

    rowData.forEach(element => {

      if(searchData.length > 10){
        return
      }

      if(element.includes(search)){
        searchData.push(element);
      }
    });

    setExampleState(searchData);

    if(search == ''){
      setExampleState([]);
    }
  }

  return (
    <View style={styles.container}>
        <SearchBar
          value={searchText}
          placeholder="Search Place"
          onSubmit={(value: any) => handleOnSearch()}
          onCancel={clear}
          onChange={onChange}
          showCancelButton={true}
          cancelText='Clear'
        />
        <View style={{justifyContent: "center", alignItems: "center" }}>
        {loading && <ActivityIndicator size="small" color={"#000000"} />}
      </View>
      <View style={{zIndex: 2, position: 'absolute', backgroundColor: '#ffffff', width: 300}}>
        <FlatList
            
            scrollEnabled={false}
            data={exampleState}
            renderItem={({item}) => renderItem(item)}
        />
      </View>
      <WebView source={{ uri: mapUrl }} style={styles.map} />
      <View style={styles.valueSection}>
        {location !== '' ? (
          <Text>{`Current search location is: ${location}`}</Text>
        )  : (
          <Text>{'No location found/Pending search'}</Text>
        )}
      </View>
    </View>
  );
};

export default Home;
