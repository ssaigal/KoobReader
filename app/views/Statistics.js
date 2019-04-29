import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Button} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import email from 'react-native-email'



class Statistics extends Component {

  handleEmail = () => {
    const to = ['tiaan@email.com'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        subject: 'Book Statistics Report',
        body: 'Book Name: An Antartic Mystery'
    }).catch(console.error)
}

  render() {
    return (
      <View styles={styles.container}>
      <View style = {{fontSize: 16,fontWeight: 'bold', padding: 10,alignSelf:"center"}}>
        <Text>Time spent per Page</Text>
      </View>
      
      <View >
      <LineChart
              data={data}
              width={screenWidth}
              height={320}
              chartConfig={chartConfig}
              bezier
    />
      </View>
      <View style={{marginTop:"8%"}}>
                <Button title="Email Reviewer" onPress={this.handleEmail} />
            </View>
        
    </View>
    );
  }
}

const chartConfig = {
  backgroundGradientFrom: '#f2f1ef',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3 // optional, default 3
}

const data = {
  labels: [3, 17,50, 60, 113, 231],
  datasets: [{
    data: [ 6000, 2000, 3000, 7000, 1000, 3000 ],
    color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`, // optional
    strokeWidth: 3 // optional
  }]
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "8%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});


export default Statistics;