import React, {Component} from 'react';
import {View} from 'react-native';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    console.log('---------');
    return {hasError: true};
  }

  componentDidCatch(error) {
    console.log('Error: ' + error);
  }

  render() {
    if (this.state?.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <View>Something Went Wrong, Please restart app</View>
        </>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
