import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import { LocaleProvider } from 'antd'
import PropTypes from 'prop-types'

// import i18n configs.
import zhCN from 'vi18n/zh.js'
// import enUS from 'vi18n/en.js'
import enUS from 'antd/lib/locale-provider/en_US'

addLocaleData([...zhCN, enUS])

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    console.log(this.props.store)
    return (
      <LocaleProvider locale={enUS}>
        <IntlProvider locale={navigator.language}>
          <Provider store={this.props.store}>
            <div style={{ height: '100%' }}>
              <Router history={browserHistory} children={this.props.routes} />
            </div>
          </Provider>
        </IntlProvider>
      </LocaleProvider>
    )
  }
}

export default App
