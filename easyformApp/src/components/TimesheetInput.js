import React, { Component } from 'react'
import { View, Text, TextInput, Picker, Button } from 'react-native'
import axios from 'axios'
import Toast, { DURATION } from 'react-native-easy-toast'

class TimesheetInput extends Component {
    constructor ( props ) {
        super(props);

        this.state = {
            name: '',
            job: '',
            errors: null
        }
    }

    onChangeTextHandler = text => {
        this.setState({ name: text })
    };

    onPressStartHandler = () => {
        const startData = {
            name: this.state.name,
            job: this.state.job
        };

        axios.post('http://localhost:5000/api/timesheet/start', startData)
            .then(res => {
                this.setState({ name: '', job: '', errors: null });
                this.refs.toast.show(res.data.msg);
            })
            .catch(err => {
                this.setState({ errors: err.response.data });
                this.refs.toast.show(err.response.data.msg);
            })
    };

    onPressFinishHandler = () => {
        const finishData = {
            name: this.state.name,
            job: this.state.job
        };

        axios.post('http://localhost:5000/api/timesheet/finish', finishData)
            .then(res => {
                this.setState({ name: '', job: '', errors: null });
                this.refs.toast.show(res.data.msg);
            })
            .catch(err => {
                this.setState({ errors: err.response.data });
                this.refs.toast.show(err.response.data.msg);
            })
    };

    render () {
        const { error } = this.state;
        return (
            <View style={styles.inputField}>
                <Text style={styles.header}>Create Timesheet</Text>
                <View style={styles.inputItem}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1 }}
                        placeholder={'Enter your name'}
                        value={this.state.name}
                        underlineColorAndroid={'transparent'}
                        onChangeText={this.onChangeTextHandler}
                    />
                    <Text style={styles.errorText}>{error}</Text>
                    {this.state.errors && ( <Text style={styles.errorText}>{this.state.errors.name}</Text> )}
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.label}>Job(Select)</Text>
                    <Picker
                        style={{ width: 300 }}
                        selectedValue={this.state.job}
                        onValueChange={( itemValue, itemIndex ) => this.setState({ job: itemValue })}>
                        <Picker.Item label="Please select an option" value=""/>
                        <Picker.Item label="job1" value="job1"/>
                        <Picker.Item label="job2" value="job2"/>
                        <Picker.Item label="job3" value="job3"/>
                    </Picker>
                    {this.state.errors && ( <Text style={styles.errorText}>{this.state.errors.job}</Text> )}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200 }}>
                    <View>
                        <Button
                            onPress={this.onPressStartHandler}
                            title="Start"
                            color="blue"
                            style={styles.buttonStyle}
                            accessibilityLabel="Start work"
                        />
                    </View>
                    <View>
                        <Button
                            onPress={this.onPressFinishHandler}
                            title="Finish"
                            color="red"
                            style={styles.buttonStyle}
                            accessibilityLabel="Finish work"
                        />
                    </View>
                </View>
                <Toast ref="toast"/>
            </View>
        )
    }
}

const styles = {
    inputField: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputItem: {
        marginBottom: 20
    },
    header: {
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10
    },
    buttonStyle: {
        fontSize: 30,
        marginBottom: 10
    },
    errorText: {
        color: 'red'
    }
};

export default TimesheetInput