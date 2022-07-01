import { Content, Footer, Header, Sidebar } from './index';
import React from 'react';

class MainLayout extends React.Component {
 
  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        <Sidebar />
        <Content >
          <Header />
          {children}
          <Footer />
        </Content>
      </main>
    );
  }
}

export default MainLayout;
