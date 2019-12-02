import React from 'react';
import NotFound from '../../components/layout/notFound'

const withProtected = (WrappedComponent, selectData) => {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      // ... that takes care of the subscription...
    }

    componentWillUnmount() {
    }

    handleChange() {
      
    }

    render() {
      const {
        auth,
        user
      } = this.props
      if(!auth.isAuthenticated && !auth.isRunning) return <NotFound />
      if(!auth.slug) return null
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withProtected;