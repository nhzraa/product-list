import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

interface Product {
  id: string;
  title: string;
  description: string;
  prices: {
    price: string;
    promo: string;
    discount: string;
  };
  stock_qty: string;
  image_url: string;
}

interface Data {
  total_data: string;
  data: Product[];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '18%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
});

const FunctionalComponent: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fcs-staging.webtek.my/api/v1/merchant_product_list?UUID=BB9AD47C-B0A7-A1F4-F8BA-4A7409F892F1&tenant_code=T210085827&stall_id=9&limit=10000000&offset=0');
        const jsonData: Data = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
        <Text style={{
           fontSize:15,
           fontWeight: '600',
           textAlign: 'center',
        }}>Warisan Nasi Kukus</Text>

        <Text style={{
           fontSize: 13,
           fontWeight: '400',
           color: '#21D375',
           marginBottom: 10,
           textAlign: 'center',
        }}>Open

        <Text style={{
           color: 'grey',
           fontSize: 13,
           fontWeight: '400',
           textAlign: 'center',
           marginBottom: 10,
           }}> | Malay,Indonesian,Thai</Text>
        </Text>

        <View style={{
           width:'100%',
           height:'100%',
           backgroundColor: '#EBE8E2',
           position:'relative',
        }}>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (

        <ScrollView>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 13,
        }}>

        <Text style={{
          fontSize: 13,
          fontWeight: '600',
          color: 'black',
        }}>Products</Text>

        {data?.total_data &&
          <Text style={{
            fontSize: 13,
            color: 'grey',
            fontWeight: '600',
          }}>{data.total_data} items</Text>}
      </View>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 10,
        }}>

         {data?.data.map((item, index) => (
            <View key={index} style={{ width: '48%', marginBottom: 20}}>
              {item.image_url && (
                <Image
                  source={{ uri: item.image_url }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 15, }}
                />
              )}
              <Text style={{
                 fontSize: 10,
                 fontWeight: '600',
                 color: 'black',
                 marginTop: 5,
               }}>{item.title}</Text>

              <Text style={{
                 fontSize: 12,
                 fontWeight: '600',
                 color: 'black',
                 marginTop: 2,
               }}>RM {item.prices.price}</Text>
            </View>
          ))}
          </View>
        </ScrollView>
      )}
    </View>
    </View>
  );
};

export default FunctionalComponent;